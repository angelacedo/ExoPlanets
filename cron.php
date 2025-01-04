<?php

$MYSQL_HOST = "srv1423.hstgr.io";
$MYSQL_USER = "u431114049_exoplanets_adm";
$MYSQL_PASS = "4~YD]2Bg";
$MYSQL_DB = "u431114049_exoplanets";
$BASE_URL = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=SELECT%20*%20FROM%20pscomppars&format=json';

function jsonToInserts($apiUrl, $tableName, $dbConfig) {
    try {
        // Definir las columnas permitidas
        $allowedColumns = [
            "objectid", "pl_name", "pl_letter", "pl_status", "pl_bmasse", "pl_orbper", "pl_orbeccen",
            "pl_radj", "pl_rade", "pl_massj", "pl_masse", "hostid", "hostname", "disc_pubdate",
            "disc_year", "disc_method", "discoverymethod", "disc_locale", "disc_facility",
            "disc_instrument", "disc_telescope", "disc_refname", "ra", "rasymerr", "rastr",
            "ra_solnid", "ra_reflink", "dec", "decsymerr", "decstr", "dec_solnid", "dec_reflink",
            "glon", "glonstr", "glon_solnid", "glon_reflink", "glat", "glatstr", "glat_solnid",
            "glat_reflink", "elon", "elonstr", "elon_solnid", "elon_reflink", "elat", "elat_solnid",
            "elat_reflink", "elatstr", "sy_snum", "sy_dist"
        ];

        // Llamada a la API
        $response = file_get_contents($apiUrl);
        if ($response === FALSE) {
            throw new Exception("Error al obtener datos de la API.");
        }

        // Convertir la respuesta a JSON
        $data = json_decode($response, true);
        if (!is_array($data)) {
            throw new Exception("El JSON recibido no es un array.");
        }

        // Conectar a la base de datos
        $conn = new mysqli($dbConfig['host'], $dbConfig['user'], $dbConfig['password'], $dbConfig['database']);
        if ($conn->connect_error) {
            throw new Exception("Error de conexión a la base de datos: " . $conn->connect_error);
        }

        // Eliminar datos existentes de la tabla
        $conn->query("DELETE FROM `" . $tableName . "`;");

        // Insertar datos
        foreach ($data as $record) {
            $filteredRecord = array_filter(
                $record,
                function($key) use ($allowedColumns) {
                    return in_array($key, $allowedColumns);
                },
                ARRAY_FILTER_USE_KEY
            );

            if (empty($filteredRecord)) continue;

            $columns = "`" . implode("`, `", array_keys($filteredRecord)) . "`";
            $values = array_map(function($value) use ($conn) {
                if ($value === null) return "NULL";
                return is_string($value) ? "'" . $conn->real_escape_string($value) . "'" : $value;
            }, array_values($filteredRecord));

            $valuesList = implode(", ", $values);
            $insertStatement = "INSERT INTO `$tableName` ($columns) VALUES ($valuesList);";

            if (!$conn->query($insertStatement)) {
                throw new Exception("Error al insertar datos: " . $conn->error);
            }
        }

        // Confirmar cambios
        $conn->commit();

        // Cerrar conexión
        $conn->close();

        echo "Datos insertados correctamente en la tabla $tableName.\n";

    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

// Ejemplo de uso
$apiUrl = $BASE_URL;
$tableName = "pscomppars";

$dbConfig = [
    'host' => $MYSQL_HOST,
    'user' => $MYSQL_USER,
    'password' => $MYSQL_PASS,
    'database' => $MYSQL_DB
];

jsonToInserts($apiUrl, $tableName, $dbConfig);
