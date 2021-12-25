import React from 'react'
import { Col, Row, Form, Button, ArrayField } from '@douyinfe/semi-ui'
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import './App.css';
import router1 from '../image/router1.png'
import router2 from '../image/router2.png'
import router3 from '../image/router3.png'
const Picture=() => {
  function initDiagram(){
    const $ = go.GraphObject.make;
    const diagram =
    $(go.Diagram,
      {
        'undoManager.isEnabled': true,  // enable undo & redo
        'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
        model: $(go.GraphLinksModel,
          {
            linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
          }),
          padding: new go.Margin(5, 5, 25, 5)
      });
    diagram.nodeTemplate = //定义节点
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
    {
      mouseEnter: mouseEnter,
      mouseLeave: mouseLeave,
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Picture,{//节点显示图片
      width:120,
      height:80
    },
    new go.Binding('source','img'),
    ),
    $(go.TextBlock,//右边端口号
      { 
        margin: 4,
        stroke:'black',
        background: 'transparent',
        font: "bold 12px sans-serif",
        alignment: go.Spot.BottomRight, 
        editable: true },  
        new go.Binding('text','text1'),
        new go.Binding("visible", "isHighlighted").ofObject(),
        ),
      $(go.TextBlock,//左边端口号
      { 
        margin: 4,
        stroke:'black',
        background: 'transparent',
        font: "bold 12px sans-serif",
        alignment: go.Spot.BottomLeft, 
        editable: true },  
        new go.Binding('text','text2'),
      new go.Binding("visible", "isHighlighted").ofObject(),
            ),
    $(go.TextBlock,//路由器名称
    new go.Binding('text','name')),
  );

  diagram.linkTemplate = //定义线条
  $(go.Link,
    { routing: go.Link.Orthogonal, corner: 3 }, // 风格：折线直角弯，弧度5像素
    $(go.Shape, { strokeWidth: 2, stroke: "black" }), // 线宽3像素，褐色
    $(go.TextBlock,{
        margin: 4,
        stroke:'black',
        alignment: go.Spot.Top,
        alignmentFocus: go.Spot.Bottom,
    },new go.Binding('text').makeTwoWay())
  );

    return diagram
  }
  function mouseEnter(e, obj) {
    obj.isHighlighted = true;
    //alert('GoJS model Entered!');
  };
  function mouseLeave(e, obj) {
    obj.isHighlighted = false;
  };
  function showArrowInfo(e, obj) {
    const msg = true;
    if(msg == true){
      alert('路由器已连接！');
    }
  }
  const nodeArray = [
    { key: 0, name: 'Router1', text1 : 's0/0/0',loc: '-180 50',img:router1},
    { key: 1, name: 'Router2',text1 : 's0/0/1',text2:'s0/0/0',loc: '10 50',img:router2},
    { key: 2, name: 'Router3',text2:'s0/0/1',loc: '200 50',img:router3},
  ];
  const dataArray = [{ key: -1, from: 0, to: 1 ,text: '192.168.0.1'},
    { key: -2, from: 1, to: 2,text:'192.168.0.2'},
  ];
  return(
    <div>
      <Row type="flex" justify="center">
      <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={nodeArray}
                linkDataArray={dataArray}
                />
      </Row>
    </div>
  )

}
export default Picture