<?php

$uri = substr($_SERVER['REQUEST_URI'], -1) === '/'
    ? $_SERVER['REQUEST_URI'] .'/index'
    : $_SERVER['REQUEST_URI'];

$page = __DIR__ . $uri . '.html';

$exceptUri = [
    '/errors/404',
];

// If a PHP file is given on the command line when the web server is started it is treated as a "router" script.
// The script is run at the start of each HTTP request. If this script returns FALSE, then the requested resource
// is returned as-is. Otherwise the script's output is returned to the browser.
if (php_sapi_name() === 'cli-server') {
    if (file_exists($page)) {
        return include $page;
    } else {
        return false;
    }
}

// If a PHP file is running on the apache or nginx server then resolve page or exit with the "404 Not Found" response.
//
// Server (excluding apache for which .htaccess has been prepared) must follow given rules:
// 1. Remove trailing slashes (https://example.com/ -> https://example.com)
// 2. Redirect http to https (http://www.example.com -> https://www.example.com)
// 3. Redirect www to non www (https://www.example.com -> https://example.com)
// 4. Remove trailing .html (https://example.com/download.html -> https://example.com/download)
// 4. Remove trailing index (https://example.com/index -> https://example.com/)
// 5. Redirect all request except existing files (eq. images) to the index.php
if (file_exists($page) && !in_array($uri, $exceptUri)) {
    include $page;
} else {
    http_response_code(404);
    include __DIR__ . '/errors/404.html';
}
