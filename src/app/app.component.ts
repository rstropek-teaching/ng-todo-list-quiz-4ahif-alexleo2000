import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],



})
export class AppComponent implements OnInit {
  title = 'ToDo-List'
  allTodos;
  todoList;
  todoListFiltered;
  people;
  overlay = { 'display': 'none' };

  id = 0;
  delId
  assignedTo = "";
  desc = "";
  done;


  openCollapsible() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }


  async loadAllTodos() {
    const todoResponse = await fetch('http://localhost:8080/api/todos')
    this.allTodos = await todoResponse.json();
  }
  async loadAllPeople() {
    const peopleResponse = await fetch('http://localhost:8080/api/people')
    this.people = await peopleResponse.json();
  }

  showAllTodos() {
    this.todoList = this.allTodos
  }


  showOverlay() {
    this.overlay = { 'display': 'block' };
  }

  hideOverlay() {
    this.overlay = { 'display': 'none' };
  }


  postNewTodo() {
    console.log(this.assignedTo, this.desc, this.done);

    var http = new XMLHttpRequest();
    var params = `{"id":"${this.id++}", "assignedTo": "${this.assignedTo}", "description": "${this.desc}", "done": "${this.done}"}`;
    http.open("POST", "http://localhost:8080/api/todos", true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () {//Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
      }
    }
    http.send(params);
  }

  deleteToDo() {
    var http = new XMLHttpRequest();
    var params = `{"id":"${this.id++}", "assignedTo": "${this.assignedTo}", "description": "${this.desc}", "done": "${this.done}"}`;
    http.open("DELETE", "http://localhost:8080/api/todos" + `/${this.delId}`, true);

    http.onreadystatechange = function () {//Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
      }
    }
    http.send(null);
  }

  changeDone(event) {
    this.done = (event.target.value == 'True')
  }

  filterByPerson(event) {
    this.loadAllTodos
    let personName = event.target.value;
    let person = this.allTodos.filter(
      todo => todo.assignedTo === personName
    );
    this.todoList = person;
  }

  showUndone() {
    this.loadAllTodos
    let undone = this.allTodos.filter(
      todo => todo.done === false
    );
    this.todoList = undone;
  }

  ngOnInit() {
    this.loadAllTodos()
    this.loadAllPeople();


  }
}