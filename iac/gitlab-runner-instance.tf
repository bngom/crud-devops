provider "aws" {
	region = "us-east-2"
}

# resource "tls_private_key" "this" {
#   algorithm = "RSA"
# }

# module "key_pair" {
#   source = "terraform-aws-modules/key-pair/aws"

#   key_name   = "gitlab-runner-key"
#   public_key = tls_private_key.this.public_key_openssh
# }

# output "ip" {
#   value = aws_eip.ip.public_ip
# }

resource "aws_security_group" "basic_security" {
    
    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 8080
        to_port     = 8080
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 27017
        to_port     = 27017
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
    
}
resource "aws_instance" "gitlab-runner" {
	ami = "ami-07efac79022b86107"
	instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.basic_security.id]
	key_name = "ec2-p2"
	user_data = file("user_data.sh")
  tags = {
    name = "gitlab-runner"
    type = "t2.micro"
    stage = "dev"
  }
}
