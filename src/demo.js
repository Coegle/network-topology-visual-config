import React from "react";
import useNext from "react-next-ui";

const App = () => {
  const sampleTopology = {
    nodes: [
      { id: 1, name: "Edge1", type: "switch" },
      { id: 2, name: "Edge2", type: "switch" },
    ],
    links: [{ source: 1, target: 2 }],
  };

  const sampleConfig = {
    autoLayout: true,
    adaptive: true,
    identityKey: "id",
    showIcon: true,
    dataProcessor: "force"
  };
  const { NextUI } = useNext({
    topologyData: sampleTopology,
    topologyConfig: sampleConfig,
    style: { height: "90vh", width: "65vw" },
  });

  return <div>{NextUI}</div>;
};

export default App