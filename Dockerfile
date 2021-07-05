FROM klakegg/hugo:0.83.1-ext-alpine-onbuild as build

#############

FROM nginx:1-alpine

COPY --from=build /target /usr/share/nginx/html