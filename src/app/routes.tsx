import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { NotFound, Loading } from '@app/components';
import { CodeEditorDemo } from '@app/POC/CodeEditorDemo';

const Dashboard = lazy(() => import('@app/modules/Dashboard/Dashboard'));
const ResourceManagement = lazy(() => import('@app/modules/ResourceManagement/ResourceManagement'));
const ProjectManagement = lazy(() => import('@app/modules/ProjectManagement/ProjectManagement'));
const RoasterManagement = lazy(() => import('@app/modules/RoasterManagement/RoasterManagement'));
const DynamicForm = lazy(() => import('@app/POC/DynamicForm'));
const FormBuilderDemo = lazy(() => import('@app/POC/FormBuilderDemo'));

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/resource-management" component={ResourceManagement} exact />
          <Route path="/project-management" component={ProjectManagement} exact />
          <Route path="/roaster-management" component={RoasterManagement} />
          <Route path="/poc" component={DynamicForm} />
          <Route path="/builder" component={FormBuilderDemo} />
          <Route path="/code-editor" component={CodeEditorDemo} />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export { AppRoutes };
