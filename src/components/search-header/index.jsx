import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RootStore } from "../../stores";

const rootStore = new RootStore();

const SearchHeader = observer(() => {
  const { nodeStore } = rootStore;
  useEffect(() => {
    if (nodeStore.nodes.length === 0) {
      nodeStore.loadNodes();
    }
  }, [nodeStore]);
  const data = nodeStore.nodes;

  return <div>Search Header</div>;
});

export default SearchHeader;
