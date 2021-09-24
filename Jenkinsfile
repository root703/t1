
# All the environment variables are defined under Settings > CI/CD > Secret Variables section 
image: docker:latest
variables:
  DOCKER_DRIVER: overlay2

services:
- docker:dind

stages:
- build_dev
- build_prod
- deploy_dev
- deploy_prod

before_script:
- docker login $REGISTRY  -u $REGISTRY_USER -p $REGISTRY_USER_PASSWORD

build_dev:
  stage: build_dev
  only:
   - /^dev-.*$/
  except:
   - branches
  script:
  - docker build --no-cache -t "$REGISTRY/$REPO_DEV:$CI_BUILD_REF_NAME" .
  - docker push $REGISTRY/$REPO_DEV:$CI_BUILD_REF_NAME

build_prod:
  stage: build_prod
  only:
  - /^prod-.*$/
  except:
  - branches
  script:
  - docker build --no-cache -t "$REGISTRY/$REPO_DEV:$CI_BUILD_REF_NAME" .
  - docker push $REGISTRY/$REPO_DEV:$CI_BUILD_REF_NAME
  

deploy_dev:
  stage: deploy_dev
  script:
  # Install python requirements
  - apk update
  - apk upgrade
  - apk add util-linux pciutils usbutils coreutils binutils findutils grep
  - apk add python python-dev py-pip

  # AWS configs
  - export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY
  - export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_KEY

  # Install awscli
  - pip install awscli

  # Configure deploy.json
  - cd deployment
  - sed -i -e "s/N_ENV/$NODE_ENV_DEVELOPMENT/g" deploy.json
  - sed -i -e "s/REPO/$REPO_DEV/g" deploy.json
  - sed -i -e "s/TAG/$CI_BUILD_REF_NAME/g" deploy.json

  # Update task and service
  - aws ecs register-task-definition --region <your-ecs-region> --cli-input-json file://deploy.json >> temp.json
  - REV=`grep  '"revision"' temp.json | awk '{print $2}'`
  - echo $REV
  - aws ecs update-service --cluster <ecs-cluster-name> --service <ecs-service-name> --task-definition <your-ecs-task-name>:${REV} --region <your-ecs-region>  
  when: manual

deploy_prod:
  stage: deploy_prod
  script: 
  # Install python requirements
  - apk update
  - apk upgrade
  - apk add util-linux pciutils usbutils coreutils binutils findutils grep
  - apk add python python-dev py-pip

  # AWS configs
  - export AWS_ACCESS_KEY_ID=AKIASXVFUKPK6W6ZKEU3
  - export AWS_SECRET_ACCESS_KEY=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

  # Install awscli
  - pip install awscli

  # Configure package.json
  # cd deployment
  - sed -i -e "s/N_ENV/$NODE_ENV_PRODUCTION/g" package.json
  - sed -i -e "s/REPO/$REPO_PROD/g" package.json
  - sed -i -e "s/TAG/$CI_BUILD_REF_NAME/g" package.json
  # Update task and service
  - aws ecs register-task-definition --region  us-west-1 --cli-input-json file://package.json >> temp.json
  - REV=`grep  '"revision"' temp.json | awk '{print $2}'`
  - echo $REV
  - aws ecs update-service --cluster ECSJenkins --service ecs  --task-definition deployment:${REV} --region us-west-1
  when: manual
