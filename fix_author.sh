#!/bin/bash
cd '/d/DiemMyCMS_SOLUTION/DiemMyCMS_SOLUTION'
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f --env-filter '
export GIT_AUTHOR_NAME="Diem My"
export GIT_AUTHOR_EMAIL="tranthidiemmyd09@gmail.com"
export GIT_COMMITTER_NAME="Diem My"
export GIT_COMMITTER_EMAIL="tranthidiemmyd09@gmail.com"
' -- --all
echo "DONE"
