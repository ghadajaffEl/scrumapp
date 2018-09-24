
import React, { Component } from "react";
import axios from "axios";
import "../../../../scrum-app/node_modules/font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

class UserStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      inprogress: [],
      team: [],
      startdate: "",
      finishdate: "",
      taskdone: [],
      image: "",
      display: "none",
      task: "",
      member: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }
  componentDidMount() {
    axios.get(`/team`).then(res => {
      this.setState({
        team: res.data
      });
    });
  }

  ///DnD done

  onDragStartDone = (ev, id) => {
    console.log("dragstart:", id);

    ev.dataTransfer.setData("id", id);
  };
  onDragOverDone = ev => {
    ev.preventDefault();
  };

  onDropDone = ev => {
    let isdone = ev.dataTransfer.getData("id");
    let taskdone = this.state.taskdone;
    taskdone.push(isdone);
    this.setState({ taskdone });
    console.log(taskdone);
    let inprogress = this.state.inprogress.filter(e => {
      e.task != isdone;
    });
    console.log(inprogress)
    this.setState({ inprogress, inprogress });
  };

  ///DnD member
  onDragStartImage = (ev, id) => {
    console.log("dragstart:", id);

    ev.dataTransfer.setData("id", id);
  };
  onDragOverImage = ev => {
    ev.preventDefault();
  };

  onDropImage = ev => {
    let id = ev.dataTransfer.getData("id");
    let member = this.state.member;
    member.push(id);
    this.setState({ member });
    console.log(member);
  };

  ////DnD Task
  onDragOverTask = ev => {
    ev.preventDefault();
  };
  onDragStartTask = (ev, id) => {
    console.log("dragstart:", id);

    ev.dataTransfer.setData("id", id);
  };
  onDropTask = ev => {
    let id = ev.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter(task => {
      if (task.text == id) {
        //task.status = status;
      }
      return task;
    });
    this.setState({ tasks, tasks });
    this.setState({ task: id });
  };
  displayForm = () => {
    this.setState({ display: "block" });
    this.setState({ member: [] });
    this.setState({ task: "" });
  };
  //creation du sprint
  createSprint = () => {
    let inprogress = this.state.inprogress;
    let sprint = {
      task: this.state.task,
      startdate: this.state.startdate,
      finishdate: this.state.finishdate,
      member: this.state.member
    };
    inprogress.push(sprint);
    this.setState({ inprogress });
    this.setState({ display: "none" });
    console.log(this.state.inprogress);

    axios
      .post("/addSprint", {
        task: this.state.task,
        startdate: this.state.startdate,
        finishdate: this.state.finishdate,
        member: this.state.member
      })
      .then(res => alert(res.data))
      .catch(err => alert(err));
  };

  render() {
    return (
      <div className="bodybg">
        <div className="grid-container">
          <div className="draggable-backloglist">
            <h4 className="list-group-item active title-user ">Backlog List</h4>

            {this.state.tasks.map((el, i) => {
              return (
                <div className="userstory">
                  <label
                    className="task"
                    key={i}
                    draggable
                    onDragStart={e => this.onDragStartTask(e, el.text)}
                  >
                    {el.text}
                  </label>
                  <button type="button" class="btn btn-info story-status">
                    {" "}
                    {el.status}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="inprogress">
            <h4 className="list-group-item active title-user">
              In Progress{" "}
              <i
                className="fa fa-plus fa-1x"
                style={{ color: "white", marginLeft: "3vw" }}
                onClick={this.displayForm}
              />
            </h4>

            <div
              className="form-createSprint"
              style={{ display: this.state.display, marginBottom: "1vw" }}
            >
              <div className="font-weight-bold sprint-container">
                <div className="input ">
                  <label>To Do:</label>
                  <input
                    style={{ width: "11vw", marginLeft: "2vw" }}
                    onDragOver={e => this.onDragOverTask(e)}
                    onDrop={e => this.onDropTask(e)}
                    value={this.state.task}
                  />
                </div>

                <div className="input">
                  <label>Start date:</label>
                  <input
                    type="date"
                    onChange={e => this.setState({ startdate: e.target.value })}
                  />
                </div>
                <div className="input">
                  {" "}
                  <label>Finish date</label>
                  <input
                    type="date"
                    onChange={e =>
                      this.setState({ finishdate: e.target.value })
                    }
                  />
                </div>
                <label className="input ">Assigned to:</label>
                <div
                  className="member-container"
                  onDragOver={e => this.onDragOverImage(e)}
                  onDrop={e => this.onDropImage(e)}
                >
                  {" "}
                  {this.state.member.map(el => {
                    return <img className="img-member" src={el.toString()} />;
                  })}
                </div>
                <div className="icon-check">
                  <i
                    className="fa fa-check-circle fa-2x"
                    style={{ color: "green" }}
                    onClick={this.createSprint}
                  />
                </div>
              </div>
            </div>
            {this.state.inprogress.map(el => {
              return (
                <div className="font-weight-bold sprint-container">
                  <div className="input ">
                    <label
                      draggable
                      onDragStart={e => this.onDragStartDone(e, el.task)}
                    >
                      To Do:
                      {el.task}
                    </label>
                  </div>
                  <div className="input ">
                    <label>
                      Start date:
                      {el.startdate}
                    </label>
                  </div>
                  <div className="input ">
                    <label>
                      Finish date:
                      {el.finishdate}
                    </label>
                  </div>
                  <label className="input ">Assigned to:</label>

                  <div className="member-container">
                    {el.member.map(e => (
                      <img className="img-member" src={e} />
                    ))}
                  </div>
                  <div className="icon-edit">
                    <i
                      className="fa fa-check-circle "
                      style={{ color: "green" }}
                      onClick={el => this.createSprint(el)}
                    />
                    <i className="fa fa-pencil" style={{ color: "blue" }} />

                    <i className="fa fa-times" style={{ color: "red" }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="isdone"
            onDragOver={e => this.onDragOverDone(e)}
            onDrop={e => this.onDropDone(e)}
          >
            <div>
              <h4 className="list-group-item active title-user">Is Done</h4>
            </div>
            {this.state.taskdone.map(el => (
              <div className="done">
                <h6 className="font-weight-bold" style={{ marginRight: "7vw" }}>
                  Task done:
                  {el}
                </h6>
              </div>
            ))}
          </div>

          <div className="team">
            <h4 className="list-group-item active title-user">Member</h4>

            {this.state.team.map(el => {
              return (
                <div className="team-member">
                  <h6>{el.fullname}</h6>
                  <h6>{el.status}</h6>
                  <img
                    className="img-member img-member-position"
                    src={el.photo.toString()}
                    draggable
                    onDragStart={e => this.onDragStartImage(e, el.photo)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default UserStory;
