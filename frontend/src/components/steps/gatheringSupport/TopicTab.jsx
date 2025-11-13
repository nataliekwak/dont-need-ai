// import { useAssignmentStore } from "../../../store/assignmentsStore";
import React from "react";

const TopicTab = ({ topic }) => {
  // const { currentTopic } = useAssignmentStore();

  return <div>{topic.name} tab</div>;
};

export default TopicTab;
