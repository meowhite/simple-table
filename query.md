docker run -it --rm \
-p 0.0.0.0:8080:8080 \
-e APP_OPTS="-Dwes-dataservice.datasource.jdbcUrl="jdbc:oracle:thin:@//10.240.26.181:1521/FORTNAWCS" -Dwes-dataservice.datasource.driverClassName="oracle.jdbc.driver.OracleDriver" -Dwes-dataservice.datasource.username="AVENGERSDEVATHENA" -Dwes-dataservice.datasource.password="avengersdevathena" -Dwes-dataservice.datasource.dialect=oracle" \
 int-registry.fortna.com/fortna-wes/goldmine-dataservice:latest





docker run -it --rm -p 0.0.0.0:8080:8080 -e APP_OPTS="-Dwes-dataservice.datasource.jdbcUrl="jdbc:oracle:thin:@//10.240.26.186:1521/FORTNAWCS" -Dwes-dataservice.datasource.driverClassName="oracle.jdbc.driver.OracleDriver" -Dwes-dataservice.datasource.username="HEROBETAATHENA" -Dwes-dataservice.datasource.password="herobetaathena" -Dwes-dataservice.datasource.dialect=oracle"  int-registry.fortna.com/fortna-wes/goldmine-dataservice:latest