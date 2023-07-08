import React, { Component } from 'react';
import "./StatusBar.css";
import { Avatar } from '@material-ui/core';
import statusimg from "../../images/pp1.png";
import uploadimage from "../../images/statusadd.png";
import { storage, auth } from "../firebase";

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusList: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('http://localhost:8080/status')
      .then(response => response.json())
      .then(data => {
        this.setState({ statusList: data });
      });
  }

  deleteStatus = (statusId) => {
    const requestOptions = {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(`http://localhost:8080/status/${statusId}`, requestOptions)
      .then(response => {
        if (response.ok) {
          this.getData();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  uploadStatus = (event) => {
    let image = event.target.files[0];
    const thisContext = this;
    if (image == null || image == undefined)
      return;

    var uploadTask = storage.ref("status").child(image.name).put(image);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
      },
      function (error) {
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL);

          let payload = {
            "statusId": Math.floor(Math.random() * 100000).toString(),
            "userId": JSON.parse(localStorage.getItem("users")).uid,
            "path": downloadURL,
            "timeStamp": new Date().getTime()
          }

          const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }

          fetch("http://localhost:8080/status", requestOptions)
            .then(response => response.json())
            .then(data => {
              thisContext.getData();
            })
            .catch(error => {

            })

        })
      }
    );
  }

  render() {
    return (
      <div>
        <div className="statusbar__container">
          <div className="fileupload">
            <label htmlFor="file-upload-status">
              <img className="statusbar__upload" src={uploadimage} width="55px" height="55px" alt="Upload status" />
            </label>
            <input id="file-upload-status" onChange={this.uploadStatus} type="file" />
          </div>
          {
            this.state.statusList.map((item, index) => (
              <div className="status" key={item.statusId}>
                <Avatar className="statusbar__status" src={item.path} />
                <div className="statusbar__text">{item.userName}</div>
                <button className="statusbar__delete" onClick={() => this.deleteStatus(item.statusId)}>Delete</button>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default StatusBar;
