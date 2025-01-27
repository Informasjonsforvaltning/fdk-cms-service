#!/bin/sh
ln -sf /usr/bin/msmtp /usr/bin/sendmail
ln -sf /usr/bin/msmtp /usr/sbin/sendmail

touch /var/log/msmtprc && chmod 666 /var/log/msmtprc

cat > /etc/msmtprc << EOL
# Set default values for all following accounts.
defaults
tls off
tls_starttls off
tls_certcheck off

account default
auth off
host $SMTP_SERVER
port $SMTP_PORT
domain $SMTP_HOSTNAME
from datalandsbyen@norge.no
add_missing_date_header on
EOL
