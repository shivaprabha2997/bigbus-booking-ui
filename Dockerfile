FROM tomcat:9-jdk17

RUN rm -rf /usr/local/tomcat/webapps/*

COPY target/*.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8088

CMD ["catalina.sh", "run"]
