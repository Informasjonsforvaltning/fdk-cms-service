#!/bin/bash

echo "Setting up msmtp"

ln -s /usr/bin/msmtp /usr/sbin/sendmail
touch /var/log/msmtprc && chmod 666 /var/log/msmtprc

cat > /etc/msmtprc << EOL
# Set default values for all following accounts.
defaults
port 25
tls on
tls_starttls on
tls_certcheck off

account default
auth off
host $SMTP_SERVER:$SMTP_PORT
domain $SMTP_HOSTNAME
from FDK Content Mangement Service<datalandsbyen@norge.no>
add_missing_date_header on
EOL
