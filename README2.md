# K8s Grafana and Promethus


## Steps for the Tutorial:

### Create IAM User and Configure aws cli , eksctl and kubectl in ec2 / local machine

### >> aws configure >> region / json / Key(Access and Secret Key)

### >> eksctl create cluster --name my-k8s-cluster --region us-east-1 --nodes 2 --node-type t3.medium 

### >> git clone https://github.com/sidoncode/k8s-Grafana-and-Promethus

### >> kubectl create -f 1-prometheus/. 

### >> kubectl create -f 2-grafana/. 

### >> kubectl get all -n monitoring 

### >> kubectl rollout restart deployment coredns -n kube-system 

### >> Click on Import Dashboard by clicking on + sign from top right corner. 

### >> For Find and Import dashboards, Enter 6417, and Click on Load.


<br>

 1001  aws configure <br>
 1002  eksctl create cluster --name my-k8s-cluster --region us-east-1 --nodes 2 --node-type t3.medium  <br>
 1003  kubectl get nodes  <br>
 1004  git clone https://github.com/sidoncode/k8s-Grafana-and-Promethus <br>
 1005  cd k8s-Grafana-and-Promethus <br>
 1006  ls -l <br>
 1007  kubectl create -f 1-prometheus <br>
 1008  kubectl create -f 2-grafana <br>
 1009  kubectl get all -n monitoring <br>
 1010  kubectl get svc _A <br>
 1011  kubectl get svc -A <br>
 1012  ssh -i "id_rsa" root@ec2-44-211-83-206.compute-1.amazonaws.com ec2metadata --public-ipv4 <br>
 1013  ssh -i "id_rsa" root@ec2-44-211-83-206.compute-1.amazonaws.com ec2metadata --public-ipv4 <br>
 1014  ssh -i "id_rsa" root@ec2-44-211-83-206.compute-1.amazonaws.com ec2metadata --public-ipv4 <br>
 1015  kubectl rollout restart deployment coredns -n kube-system  <br>
 1016  kubectl get svc -A <br>

 <br> <br> <br> <br> <br> <br>

 Steps for the Lab:
1) aws login -> IAM <br>
2) Create IAm role / role / permission <br>
3) access key / secret key generation <br>
4) install awscli, eksctl <br>
5) aws configure with Access / Secret Key <br>
6) create - cluster <br>
7) do the task <br>
8) delete the cluster <br>


########################################################################################################################################################################

Create a IAM User -> With Policies as below:
	AdministratorAccess, AmazonEKSClusterPolicy
  
  Then Click on User(new) which you just created now -> and click on Security Credentials -> Click on " Create access key "
  
  -> after Clicking on Create Access Key - It will ask for UseCase
  
  -> USE CASE: CLI
  -> Ignore the next step
  -> Generate the Keys
	-> Copy the access key and Secret key before click on finish Button ( as it will not show again after this)
  

######################################################################################################################################################################## <br>


  Launching the Ec2 - ubuntu instance
   <br>
  
   ####  installation of AWS CLI  #######
  
  https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
   <br>
  sudo apt update
 <br>
	curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

	sudo apt install unzip <br>
  
	unzip awscliv2.zip <br>

 <br>
	sudo ./aws/install
	 <br>
	aws --version
   <br>
  
  #### Install eksctl ######
 <br>
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
 <br>
sudo mv /tmp/eksctl /usr/local/bin
 <br>
eksctl version

#######################################################################################################################################################################
  
  >> aws configure with access key and secret key along with region (us-east-1 / mumbai / ap-south-1)
 <br>
	>> aws configure <br>
  >> access key <br>
  >> secret key <br>
  >> region <br>
  >> json <br>
  
  ########################################################################################################################################################################

 <br>
commands for creating a cluser and deploying a webserver (nginx Image) and expose with a service loadbalancer(ALB):

 <br>
eksctl create cluster --name my-testcluster --region us-east-1 --nodes 3 --node-type t3.medium <br>
>> taking 5-10mins to perform the thing <br>
>> while above command is executing -  we can take a look in the cloudfomration portal - so that the things are in progress / or not! <br>
 <br>
>> cost optimized commands for cluster creation <br>
>>>>>> eksctl create cluster --name my-cluster --region us-east-1 --nodes 2 --node-type t2.micro <br>
