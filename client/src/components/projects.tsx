import * as React from "react";
import * as _ from "lodash";

import Project from "./project";
import RootModal from "../containers/modal"
import {ProjectModel} from "../models/project";
import {pluralize} from "../constants/utils";

export interface Props {
  user: '';
  projects: ProjectModel[];
  onUpdate: (project: ProjectModel) => any;
  onDelete: (project: ProjectModel) => any;
  fetchData: () => any;
  showModal: () => any;
  hideModal: () => any;
}


export default class Projects extends React.Component<Props, Object> {
  componentDidMount() {
    this.props.fetchData();
  }

  public render() {
    const {user, projects, onUpdate, onDelete, fetchData, showModal, hideModal} = this.props;
    return (
      <div>
        <div className="entity-details">
          <span className="title">{user}</span>
          <span className="results-info">[{projects.length} {pluralize('Project', projects.length)}]</span>
        </div>
        <RootModal hideModal={hideModal}/>
        <ul>
          {projects.filter(
            (project: ProjectModel) => _.isNil(project.deleted) || !project.deleted
          ).map(
            (project: ProjectModel) => <li className="list-item" key={project.uuid}>
              <Project project={project} onDelete={() => onDelete(project)}/></li>)}
        </ul>
      </div>
    );
  }
}
