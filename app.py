from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from app import db
db.create_all()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:yan123@./db/todo_db'
db = SQLAlchemy(app)

# Modelo de Tarefa
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False, default='pendente')

# Endpoint para adicionar uma nova tarefa
@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    
    # Verificar se o título está presente
    if 'title' not in data or not data['title']:
        return jsonify({'error': 'Título da tarefa não pode ser vazio'}), 400

    # Criar nova tarefa
    new_task = Task(title=data['title'], status='pendente')
    db.session.add(new_task)
    db.session.commit()

    return jsonify({'message': 'Tarefa adicionada com sucesso', 'task': {'id': new_task.id, 'title': new_task.title}}), 201

if __name__ == '__main__':
    app.run(debug=True)
