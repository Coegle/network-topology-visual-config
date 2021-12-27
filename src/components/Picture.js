import React from 'react'
import { Row } from '@douyinfe/semi-ui'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import './Picture.css'

const Picture = ({ nodeArray, dataArray, setSelectedDev }) => {
  console.log(dataArray);
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
          width: 120,
          height: 80
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
        },
        $(go.Shape, { strokeWidth: 2, stroke: "black" }), // 线宽3像素，褐色
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
          { segmentIndex: -1, segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright },
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
          { segmentIndex: 0, segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright },
          new go.Binding('text', 'dstInf'),
          new go.Binding("visible", "isHighlighted").ofObject(),
        )
      )

    return diagram
  }

  function mouseEnter(e, obj) {
    obj.isHighlighted = true
  };
  function mouseLeave(e, obj) {
    obj.isHighlighted = false
  };
  const changeRouter = async (e, obj) => {
    const routerId = obj.part.data.key
    setSelectedDev(routerId)
  }

  return (
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