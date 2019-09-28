# Realizando autenticação na API da Codenation

## Tópicos
Com esse desafio, você aprenderá:

- Realizar autenticação coom a API da Codenation utilizando Axios

## Detalhes

Dentro da pasta src/screens, você encontrará a estrutura básica do teste que ja é os desafios anteriores, todos arquivos necessários de configuração já estão criados. Sua missão será criar tela conforme o exemplo do vídeo abaixo.

### Tarefas

1. Deve ser instalado o pacote `axios` no projeto.
2. Login
  - Deve ser criado a tela de login com dois inputs de email e senha.
  
  - Email input
    - [x] Deve ter o auto complete do tipo email.
    - [x] O teclado deve ser do tipo email.
    - [x] Deve conter a classe `email-input`
  
  - Password input
    - [x] Deve ter o auto complete do tipo password.
    - [x] Deve ser do tipo de texto seguro.
    - [x] Deve conter a classe `password-input`.
 
  - Botão de submit
    - [x] Deve ser um component do tipo Button do React Native.
    - [x] O titulo deve ser `Entrar`.
    
    - [?] Ele deve estar desabilitado quando:
      - O email for inválido.
      - A senha não for preenchida.
      - Estiver realizando o login.
  
  - [x] Para realizar login você precisa fazer um post com seu usuário e senha da codenation para este serviço: `https://api.codenation.dev/v1/user/auth`.
  - [x] Após o login os dados retornados deve ser salvos no `AsyncStorage` do React Native como `user`.
  - [x] Após o login o usuário deve ser redirecionado para a URL `Acceleration`

3. Acceleration
  - [x] No header deve conter também a foto do usuário carregada pelo `AsyncStorage`.
  - [x] Deve ser adicionado um loading para quando estiver carregando as acelerações, utilizando o `ActivityIndicator`.
  - [x] As acelerações devem ser carregadas do serviço: `https://api.codenation.dev/v1/acceleration`.

4. Profile
  - [x] Os dados do usuário devem ser carregados do serviço: `https://api.codenation.dev/v1/me/profile`. Este serviço requer que você passe no header o parâmetro `Authorization` com o token retornado no login.

**Para testar o acesso a API de Authenticação** é possível usar o comando cURL no terminal (Linux e Mac) ou o Postman (Linux, Windows, Mac). 

Exemplo do comando do cURL:

   curl 'https://api.codenation.dev/v1/user/auth' -H 'Content-Type: application/x-www-form-urlencoded' --data '{"email":"EMAIL","password":"SENHA"}'

### Exemplo
![](https://codenation-challenges.s3-us-west-1.amazonaws.com/react-native-5/react-native-5.webm)

## Rodando a aplicação
Na primeira execução rodar o comando:
```
npm run android
```
Para rodar a aplicação:
```
npm start
```
