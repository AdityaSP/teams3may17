import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class S3EventStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const alertLamName = cdk.Fn.importValue("alter-lambda-name");

    
    const lam = cdk.aws_lambda.Function.fromFunctionName(this, 'loadlambda', alertLamName)
    // Second hat : Team member who wants to create an S3 bucket
    const mys3 = new cdk.aws_s3.Bucket(this, "mys3", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // const eventTypes : cdk.aws_s3.EventType[] = [
    //   cdk.aws_s3.EventType.OBJECT_CREATED,
    //   cdk.aws_s3.EventType.OBJECT_REMOVED
    // ];

    mys3.addEventNotification(
      cdk.aws_s3.EventType.OBJECT_CREATED,
      new cdk.aws_s3_notifications.LambdaDestination(lam)
    );
    mys3.addEventNotification(
      cdk.aws_s3.EventType.OBJECT_REMOVED,
      new cdk.aws_s3_notifications.LambdaDestination(lam)
    );
  }
}
