FROM amazoncorretto:17
LABEL authors="mirangee"
WORKDIR /app/springboot
# Timezone setting
ENV TZ=Asia/Seoul
RUN yum update -y && \
    yum install -y tzdata && \
    ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    echo "Asia/Seoul" > /etc/timezone && \
    yum clean all

# Add a volume for the timezone files (if needed for dynamic updates)
VOLUME ["/etc/localtime:/etc/localtime:ro", "/etc/timezone:/etc/timezone:ro"]

COPY build/libs/extravel-0.0.1-SNAPSHOT.jar /app/springboot/extravel.jar
EXPOSE 8181

ENTRYPOINT ["java", "-jar", "extravel.jar"]