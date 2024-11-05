#! /bin/bash
kubectl apply -f eureka_service.yaml
kubectl apply -f rabbit_service.yaml
kubectl apply -f load_balancer.yaml
kubectl apply -f database_service.yaml
kubectl apply -f cache_service.yaml
kubectl apply -f gateway_service.yaml
kubectl apply -f env.yaml

kubectl apply -f eureka_deployment.yaml
sleep 10
kubectl apply -f rabbit_deployment.yaml
sleep 5
kubectl apply -f database_deployment.yaml
sleep 10
kubectl apply -f cache_deployment.yaml
sleep 5
kubectl apply -f gateway_deployment.yaml