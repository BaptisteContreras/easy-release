FROM node:lts

RUN mkdir /repo
RUN mkdir /easyrelease


COPY setup.sh /usr/local/bin/
COPY easyrelease.sh /usr/local/bin/easyrelease
COPY test.sh /usr/local/bin/ez
COPY resolveConflict.sh /usr/local/bin/rc

ENTRYPOINT ["setup.sh"]

CMD ["bash"]

