import requests
import json
import mysql.connector

MYSQL_HOST = "srv1423.hstgr.io"
MYSQL_USER = "u431114049_exoplanets_adm"
MYSQL_PASS = "4~YD]2Bg"
MYSQL_DB = "u431114049_exoplanets"
BASE_URL = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=SELECT%20*%20FROM%20pscomppars&format=json'

def json_to_inserts(api_url, table_name, db_config):
    try:
        # Llamada a la API
        response = requests.get(api_url)
        response.raise_for_status()

        # Convertir la respuesta a JSON
        data = response.json()

        # Asegurarse de que el JSON sea un array
        if not isinstance(data, list):
            raise ValueError("El JSON recibido no es un array.")

        # Detectar las columnas automáticamente
        if len(data) == 0:
            raise ValueError("El JSON está vacío y no se pueden detectar columnas.")

        column_names = list(data[0].keys())

        # Conectar a la base de datos
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Eliminar datos existentes de la tabla
        cursor.execute(f"DELETE FROM {table_name};")

        # Insertar datos
        for record in data:
            values = []
            for column in column_names:
                value = record.get(column, None)
                if value is None:
                    values.append("NULL")
                elif isinstance(value, str):
                    values.append(f"'{value.replace("'", "''")}'")
                else:
                    values.append(str(value))

            insert_statement = f"INSERT INTO {table_name} ({', '.join([f'`{col}`' for col in column_names])}) VALUES ({', '.join(values)});"
            cursor.execute(insert_statement)

        # Confirmar cambios
        conn.commit()

        # Cerrar conexión
        cursor.close()
        conn.close()

        print(f"Datos insertados correctamente en la tabla {table_name}.")

    except requests.exceptions.RequestException as e:
        print(f"Error al obtener datos de la API: {e}")
    except ValueError as e:
        print(f"Error en el formato de los datos: {e}")
    except mysql.connector.Error as e:
        print(f"Error al interactuar con la base de datos: {e}")

# Ejemplo de uso
if __name__ == "__main__":
    api_url = BASE_URL  # URL de la API
    table_name = "pscomppars"  # Nombre de la tabla de la base de datos

    # Configuración de la base de datos
    db_config = {
        'host': MYSQL_HOST,
        'user': MYSQL_USER,
        'password': MYSQL_PASS,
        'database': MYSQL_DB
    }

    json_to_inserts(api_url, table_name, db_config)
