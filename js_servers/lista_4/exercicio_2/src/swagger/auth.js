/**
 * @swagger
 * tags:
 *   name: User
 *   description: Autenticação e informações do usuário
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Autentica o usuário e gera um JWT
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "louvre"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso. O JWT é enviado via cookie httpOnly.
 *         headers:
 *           Set-Cookie:
 *             description: Cookie contendo o JWT (sessionId)
 *             schema:
 *               type: string
 *               example: "sessionId=eyJhbGciOiJIUzI1NiIsInR...; HttpOnly; Max-Age=900; Path=/"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login realizado com sucesso"
 *
 *       400:
 *         description: Usuário ou senha inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário e/ou senha não inválidos!"
 *
 *       500:
 *         description: Erro interno ao gerar token
 */
