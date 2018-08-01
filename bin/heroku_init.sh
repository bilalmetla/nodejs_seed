#!/usr/bin/env bash

heroku login
retval=$?
if [ $retval -eq 0 ]; then
    echo "heroku login failed."
else
heroku git:remote -a trustcash
retval=$?
if [ $retval -eq 0 ]; then
    echo "heroku added repo successfully."
else
    echo "heroku failed remote appending!"
fi
fi

