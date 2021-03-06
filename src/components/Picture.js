import React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import './Picture.css'

const Picture = ({ nodeArray, dataArray, setSelectedDev, getLinkState }) => {
  // console.log(dataArray);
  const initDiagram = () => {
    const $ = go.GraphObject.make
    const diagram = $(go.Diagram,
      {
        'undoManager.isEnabled': true,  // enable undo & redo
        'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
        'model': $(go.GraphLinksModel,
          {
            linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
          }),
        'padding': new go.Margin(5, 5, 25, 5)
      })

    diagram.nodeTemplate = //定义节点
      $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        {
          doubleClick: changeRouter
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Picture, {//节点显示图片
          width: 60,
          height: 40
        },
          new go.Binding('source', 'img'),
        ),
        $(go.TextBlock,//路由器名称
          new go.Binding('text', 'name')),
      )

    diagram.linkTemplate = //定义线条
      $(go.Link,
        {
          mouseEnter: mouseEnter,
          mouseLeave: mouseLeave,
          doubleClick: doubleClickEvent
        },
        $(go.Shape,
          { strokeWidth: 2 },
          new go.Binding("stroke", "Connected",
            function (h) {
              return h ? "#e1e1e1" : "#f8da07" || "#f8da07";
            }).ofObject()
        ),
        $(go.TextBlock, {
          margin: 4,
          stroke: 'black',
          alignment: go.Spot.Top,
          alignmentFocus: go.Spot.Bottom,
        }, new go.Binding('text').makeTwoWay()),
        $(go.TextBlock,//右边端口号
          {
            margin: 4,
            stroke: 'black',
            background: 'transparent',
            font: "bold 12px sans-serif",
            alignment: go.Spot.Right,
            editable: true
          },
          {
            segmentIndex: -1, segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding('text', 'srcInf'),
          new go.Binding("visible", "isHighlighted").ofObject(),
        ),
        $(go.TextBlock,//左边端口号
          {
            margin: 4,
            stroke: 'black',
            background: 'transparent',
            font: "bold 12px sans-serif",
            alignment: go.Spot.Left,
            editable: true
          },
          {
            segmentIndex: 0, segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding('text', 'dstInf'),
          new go.Binding("visible", "isHighlighted").ofObject(),
        )
      )

    return diagram
  }

  const mouseEnter = async (e, obj) => {
    obj.isHighlighted = true
    doubleClickEvent(e, obj)
  };
  function mouseLeave(e, obj) {
    obj.isHighlighted = false
  };
  const changeRouter = async (e, obj) => {
    const routerId = obj.part.data.key
    setSelectedDev(routerId)
  };
  const doubleClickEvent = async (e, obj) => {
    const key = obj.part.data.key;
    const success = await getLinkState({ linkIdx: key })
    obj.path.stroke = success ? "green" : "red"
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }} >
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName='diagram-component'
        nodeDataArray={nodeArray}
        linkDataArray={dataArray}
      />
    </div>
  )

}
export default Picture