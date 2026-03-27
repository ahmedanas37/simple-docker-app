FROM alpine:3.21

WORKDIR /opt/sidecar

COPY sidecar/heartbeat.sh /opt/sidecar/heartbeat.sh

RUN chmod +x /opt/sidecar/heartbeat.sh \
  && mkdir -p /shared

VOLUME ["/shared"]

CMD ["/opt/sidecar/heartbeat.sh"]
