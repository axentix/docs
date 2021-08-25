FROM klakegg/hugo:0.87.0-ext-alpine as dev

CMD [ "server", "-D" ]

#############

FROM klakegg/hugo:0.87.0-ext-alpine-onbuild as build

#############

FROM nginx:1-alpine

COPY --from=build /target /usr/share/nginx/html