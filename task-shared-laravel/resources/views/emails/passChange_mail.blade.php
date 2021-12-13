<!DOCTYPE html>
<html lang="ja">
    <style>
        body {
            background-color: #fffacd;
        }
        h1 {
            font-size: 16px;
            color: #ff6666;
        }
        #button {
            width: 200px;
            text-align: center;
        }
            #button a {
            padding: 10px 20px;
            display: block;
            border: 1px solid #2a88bd;
            background-color: #FFFFFF;
            color: #2a88bd;
            text-decoration: none;
            box-shadow: 2px 2px 3px #f5deb3;
        }
            #button a:hover {
            background-color: #2a88bd;
            color: #FFFFFF;
        }
    </style>
    <body>
        <p>{{$user_id}}."様"</p></br>
        <p>変更後のパスワードは</p>
        
        <h4>{{ $pass }}</h4>
        
        </br>
        <p>ありがとうございました。</p>
        <p>尚、ログイン後はマイページのパスワードを変更するからお好きなパスワードに変更してください。</p>
    </body>
</html>