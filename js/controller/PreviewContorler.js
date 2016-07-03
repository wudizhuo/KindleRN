'use strict';
import React, { Component } from 'react';

var BASE_URL = 'http://kindlezhushou.com/v3/';

class PreviewController extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: this.props.data,
      response: {
        content: html
      }
    };
  }

  componentDidMount() {
    var reqUrl = BASE_URL + "send/preview";
    var post_data = {
      url: this.state.url,
    }

    fetch(reqUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post_data)
    }).then((response) => response.json())
      .then((responseText) => {
        console.log(responseText);
        this.setState({
          response: responseText,
        });
      })
      .catch(() => {
        this.setState({
          response: null,
        });
      });
  }
}

module.exports = PreviewController;