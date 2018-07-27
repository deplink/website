domain=$1

# Prepare variables to start scanning from homepage.
touch _crawler_scanned
echo $domain > _crawler_all

# Repeat as long as non-scanned urls are pending:
while [[ $(comm -13 <(sort -u _crawler_scanned) <(sort -u _crawler_all)) ]]; do
	comm -13 <(sort -u _crawler_scanned) <(sort -u _crawler_all) | while read page; do
		echo -ne "$page... "
		echo $page >> _crawler_scanned

		# Check if page is abailable
		# (exit with error if is unavailable).
		curl --fail --silent $page > /dev/null
		rc=$?; if [[ $rc != 0 ]]; then
			echo FAILED
			exit 1
		fi

		# Mark page as scanned.
		echo OK

		# If page belongs to the domain then scan HTML
		# for more urls (append them to the pending list).
		if [[ $page == $domain* ]]; then
			curl --silent $page | grep href=\" | grep "https://" | grep -o "https:\/\/[^\"]*" | sort | uniq >> _crawler_all
		fi
	done

    rc=$?; if [[ $rc != 0 ]]; then
        # Remove temporal files.
        rm _crawler_all _crawler_scanned

        exit 1;
    fi
done

# Remove temporal files.
rm _crawler_all _crawler_scanned