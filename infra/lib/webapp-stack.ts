import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lifligCdk from "@liflig/cdk";
import * as webappDeploy from "@capraconsulting/webapp-deploy-lambda";
import { Construct } from "constructs";

interface Props extends cdk.StackProps {}

class WebappStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const artifactsBucket = new s3.Bucket(this, "ArtifactsBucket", {
      bucketName: "koseprogg-event-webapp-artifacts",
    });

    const webapp = new lifligCdk.webapp.Webapp(this, "KoseproggWebapp", {});

    webapp.addDeployment(
      webappDeploy.Source.bucket(artifactsBucket, "app/latest.zip")
    );
  }
}

export default WebappStack;
