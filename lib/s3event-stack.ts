import * as cdk from 'aws-cdk-lib';
import { ScheduledEc2Task } from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { S3WithAlert } from 's3withalert';

export class S3EventStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3a = new S3WithAlert(this, 'fromteam' ,{bucketName: "MyS3"})
    
    const actualbucket = s3a.getBucket()
    
    new cdk.CfnOutput(this, 'actualbucket', {
      value: actualbucket.bucketName
    })
  }
}
