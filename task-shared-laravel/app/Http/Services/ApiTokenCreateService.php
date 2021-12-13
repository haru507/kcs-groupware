<?php

namespace App\Services;

use App\Models\User;
use Carbon\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;

class ApiTokenCreateService extends Service
{

    protected $user;
    protected $now;

    public function __construct(User $user)
    {
        $this->user = $user;
        $carbon = new Carbon();
        $this->now = $carbon->now()->timestamp;
    }

    /**
     * トークンとユーザ情報のJSONデータを返却
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondWithToken() :string
    {
        return response()->json([
            'token' => [
                'access_token' => $this->createAccessToken(),
                'refresh_token' => $this->createRefreshToken()
            ],
            'profile' => [
                'id' => $this->user->uid,
                'name' => $this->user->name,
                'email' => $this->user->email,
            ]
        ]);
    }



    /**
     * API用のアクセストークンを作成
     *
     * @return string
     */
    public function createAccessToken() :string
    {
        $customClaims = $this->getJWTCustomClaimsForAccessToken();
        $payload = JWTFactory::make($customClaims);
        $token = JWTAuth::encode($payload)->get();

        return $token;
    }

    /**
     * API用のリフレッシュトークンを作成
     *
     * @return string
     */
    public function createRefreshToken() :string
    {
        $customClaims = $this->getJWTCustomClaimsForRefreshToken();
        $payload = JWTFactory::make($customClaims);
        $token = JWTAuth::encode($payload)->get();

        return $token;
    }

    /**
     * アクセストークン用CustomClaimsを返却
     *
     * @return object
     */
    public function getJWTCustomClaimsForAccessToken() :object
    {
        $data = [
            'sub' => $this->user->user_id,
            'iat' => $this->now,
            'exp' => $this->now + config('token.expire.accessToken')
        ];

        return JWTFactory::customClaims($data);
    }

    /**
     * リフレッシュトークン用CustomClaimsを返却
     *
     * @return object
     */
    public function getJWTCustomClaimsForRefreshToken() :object
    {
        $data = [
            'sub' => $this->user->user_id,
            'iat' => $this->now,
            'exp' => $this->now + config('token.expire.refreshToken')
        ];

        return JWTFactory::customClaims($data);
    }
}
