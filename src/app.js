import React, { Component } from 'react';
import ThreeItem from './component/itemThree/threeItem';
import OneItem from './component/itemOne/oneItem';
import $ from 'jquery';
import {getBrowserInfo} from './util/util';
require('./app.less');

 class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            title: '',
            imgUrl:'',
            description:'',
            fouceStauts:''
        };
    }
    _setState=(articleList)=>{
        this.setState({ articleList: articleList});
    }
    //TODO 通用设置传参数 传参顺序无关
    _setInfo=(title,imgUrl,description)=>{
        this.setState({title:title,imgUrl:imgUrl,description:description});
    }
    _setStatus=()=>{
        this.setState({fouceStauts:'已关注'})
    }
     _setStatusHavent=()=>{
         this.setState({fouceStauts:'关注'})
     }
    //加载数据
    initData=()=>{
        let url =  'http://just.baidu.com/restapi/public/articlelist?version=1.0&topicid=2523888542';
        let setState = this._setState.bind(this);

        this.serverRequest = $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            success : function(data){
                console.log('data');
                console.log(data);
                setState(data.response_params.article_list);
            },
            error:  function(data){
                console.error('error');
                console.error(data);
            }
        });
    }
     initHeader=()=>{
         let url = 'http://just.baidu.com/restapi/public/topicmeta?topicid=2523888542&version=1.0';
         let setInfo = this._setInfo.bind(this);
         this.serverRequestHeader = $.ajax({
             type: "GET",
             url: url,
             dataType: "jsonp",
             success : function(data){
                 // console.log(data);
                 if(data.response_params.topic_list.length > 0){
                     var title = data.response_params.topic_list[0].title;
                     var imgUrl = data.response_params.topic_list[0].logo.small;
                    // var subscribe = data.response_params.topic_list[0].subscribe + '人关注';
                     var description = data.response_params.topic_list[0].description;
                     setInfo(title,imgUrl,description);
                     //$('#topTitle').html(title);
                     //$('#topicImg').attr('src',imgUrl);
                    // $('#fansPeople').text(subscribe);
                 }

             }
         })
     }
     getfouusStatus = ()=>{
         let url = 'http://cq01-duwei04.epc.baidu.com:8220/api/subscribe/v1/relation/get?type=stock&sfrom=sbox&third_id=1270014357';
         let setStatus = this._setStatus.bind(this);
         let setStatusHavent = this._setStatusHavent.bind(this);
         this.serverRequestHeader = $.ajax({
             type: "GET",
             url: url,
             dataType: "jsonp",
             success : function(data){
                 JSON.stringify(data);
                 if(data.data.items.length > 0){
                    setStatus();
                     console.log('已关注');
                 }
                 else {
                     setStatusHavent();
                     console.log('未关注');
                 }

             }
         })
     }
     focusTopicForIos=()=>{
         console.log('11111111ios');
     }
     focusTopicForAndroid=()=>{
         console.log('11111111android');
     }
     focusTopic=()=>{
         let url = 'http://cq01-duwei04.epc.baidu.com:8220/api/subscribe/v1/relation/receive?type=stock&third_id=stock_US_HEES&op_type=add&sfrom=sbox';
         let setStatus = this._setStatus.bind(this);
         let setStatusHavent = this._setStatusHavent.bind(this);
         this.serverRequestHeader = $.ajax({
             type: "GET",
             url: url,
             dataType: "jsonp",
             success : function(data){
                 JSON.stringify(data);
                 if(data.data.length == 0){
                     setStatus();
                     console.log('已关注变成了未关注');
                 }
                 else {
                     setStatusHavent();
                     console.log('未关注变成了已关注');
                 }

             }
         })
     }
    componentDidMount = () => {
        this.initData();
        this.initHeader();
        this.getfouusStatus();
    }
    componentWillUnmount = () => {
        this.serverRequest.abort();
        this.serverRequestHeader.abort();
    }

  render() {
      let rows = [];
      let articleList = this.state.articleList;
      let title = this.state.title;
      let imgUrl = this.state.imgUrl;
      let description = this.state.description;
      let fouceStauts = this.state.fouceStauts;
      for (let item of articleList) {
          let len = item.abstract.image.length;
          if(len<=1){//一张图片的情况
              rows.push(
                  <OneItem itemData={item}></OneItem>
              );
          }
          else if(len>=2){//2张及以上图片的情况
              rows.push(
                  <ThreeItem itemData={item}></ThreeItem>
              );
          }
      }

    return (
      <div>
          <div className="list-head">
              <div className="pageHeader">
                  <div className="imgbg">
                      <img src={imgUrl} id="topicImg"/>
                  </div>
                  <div className="msg">
                      <div className="fontheader">
                          <h1 className="title" id="topTitle">{title}</h1>
                      </div>
                      <span className="description" id="fansPeople">{description}</span>
                  </div>
                  <div className="operation">
                      <div className="normal follow trblBor" onClick={this.focusTopic()}>
                          {fouceStauts}
                      </div>
                  </div>

              </div>
          </div>
          <div>{rows}</div>
      </div>
    )
  }
}
export default App;