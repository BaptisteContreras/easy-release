FROM node:lts

RUN mkdir /repo
RUN mkdir /easyrelease


COPY setup.sh /usr/local/bin/
COPY easyrelease.sh /usr/local/bin/easyrelease

ENTRYPOINT ["setup.sh"]

CMD ["bash"]

