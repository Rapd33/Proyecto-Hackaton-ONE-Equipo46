import pandas as pd
import sqlite3
import os

# --- CONFIGURACIÓN DE RUTAS INTELIGENTE ---
# Obtenemos la ruta absoluta de DONDE está este script (DataScience/scripts)
# Esto evita errores si ejecutas el script desde otra terminal.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 1. RUTA DEL CSV (Origen)
# Navegamos desde 'scripts' hacia 'src/infrastructure/...'
csv_path = os.path.join(
    BASE_DIR, 
    '../src/infrastructure/adapters/output/persistence/Datos_Clientes_Unicos_con_nombres.csv'
)

# 2. RUTA DE LA BASE DE DATOS (Destino)
# Salimos de 'DataScience' (../../) y entramos a 'BackEnd/database'
db_folder = os.path.join(BASE_DIR, '../../BackEnd/database')
db_path = os.path.join(db_folder, 'churn_insight.db')

# --- INICIO DEL PROCESO ---
print("🚀 Iniciando migración de CSV a SQLite...")
print(f"📍 Script ubicado en: {BASE_DIR}")

# 1. Crear carpeta destino si no existe
if not os.path.exists(db_folder):
    try:
        os.makedirs(db_folder)
        print(f"📂 Carpeta creada: {os.path.abspath(db_folder)}")
    except OSError as e:
        print(f"❌ Error creando carpeta: {e}")
        exit(1)

# 2. Leer CSV
print(f"📖 Leyendo CSV en: {os.path.basename(csv_path)}...")
if not os.path.exists(csv_path):
    print(f"❌ ERROR CRÍTICO: No encuentro el archivo CSV en:\n{os.path.abspath(csv_path)}")
    exit(1)

try:
    df = pd.read_csv(csv_path)
    
    # 3. Limpieza Automática (Vital para Java)
    # Quitamos espacios y pasamos a minúsculas: "Credit Score" -> "credit_score"
    df.columns = df.columns.str.strip().str.replace(' ', '_').str.lower()
    print("✨ Nombres de columnas normalizados (minúsculas y guiones bajos).")
    
    # 4. Guardar en SQLite
    print(f"💾 Guardando base de datos en: {os.path.abspath(db_path)}")
    conn = sqlite3.connect(db_path)
    
    # La tabla se llamará 'customers'
    df.to_sql('customers', conn, if_exists='replace', index=False)
    
    conn.close()
    print("\n✅ ¡ÉXITO TOTAL! La base de datos 'churn_insight.db' está lista en el Backend.")
    print("👉 Ahora configura Spring Boot para leerla.")

except Exception as e:
    print(f"❌ Ocurrió un error inesperado: {e}")