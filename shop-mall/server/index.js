
import express from 'express';
import pg from 'pg';
import cors from 'cors';

const app = express();
const PORT = 8000;

// PostgreSQL 연결 설정
const db = new pg.Client({
  host: 'localhost',
  user: 'jsuser',
  password: 'pwjs',
  database: 'tsdb'
});

// PostgreSQL 연결 확인
try {
  await db.connect();
  console.log('postgreSQL 연결 성공');
} catch (err) {
  console.error('postgreSQL 연결 실패:', err.message);
}

// React에서 오는 요청 허용
app.use(cors());

// JSON 요청 처리
app.use(express.json());

// 기본 주소
app.get('/', (req, res) => {
  res.send('<h2>REST API</h2>');
});

// 상품 목록 조회
app.get('/api/products', async (req, res) => {
  const sql = 'SELECT * FROM products';

  try {
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.log('상품 조회 오류!', err);
    res.status(500).send('상품 조회 중 오류가 발생했습니다.');
  }
});

// 상품 단건 조회
app.get('/api/products/:id', async (req, res) => {
  const pid = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = $1';

  try {
    const result = await db.query(sql, [pid]);
    res.json(result.rows[0]);
  } catch (err) {
    console.log('상품 조회 오류!', err);
    res.status(500).send('상품 조회 중 오류가 발생했습니다.');
  }
});


// 상품 등록
app.post('/api/products', async (req, res) => {
  const {
    pName,
    category,
    price,
    description,
    imageUrl
  } = req.body;

  const sql = `
    INSERT INTO products
      (p_name, category, price, description, image_url)
    VALUES ($1, $2, $3, $4, $5)
  `;

  try {
    await db.query(sql, [
      pName,
      category,
      price,
      description,
      imageUrl || null
    ]);

    res.send('상품 등록 완료!!');
  } catch (err) {
    console.log('상품 등록 오류!', err);
    res.status(500).send('상품 등록 중 오류가 발생했습니다.');
  }
});


// 상품 삭제
app.delete('/api/products/:id', async (req, res) => {
  const pid = req.params.id;
  const sql = 'DELETE FROM products WHERE id = $1';

  try {
    await db.query(sql, [pid]);
    res.send('상품 삭제 완료!!');
  } catch (err) {
    console.log('상품 삭제 오류!', err);
    res.status(500).send('상품 삭제 중 오류가 발생했습니다.');
  }
});

// 상품 수정
app.put('/api/products/:id', async (req, res) => {
  const pid = req.params.id;
  const { pName, category, price, description } = req.body;

  const sql = 'UPDATE products SET p_name=$1, category=$2, price=$3, '
            + 'description=$4 WHERE id=$5';

  try {
    await db.query(sql, [pName, category, price, description, pid]);
    res.send('상품 수정 완료!!');
  } catch (err) {
    console.log('상품 수정 오류!', err);
    res.status(500).send('상품 수정 중 오류가 발생했습니다.');
  }
});


// 회원 API

// 회원 목록 조회
app.get('/api/users', async (req, res) => {
  const sql = 'SELECT id, username, name, email, role FROM users';
  try {
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.log('회원 조회 오류!', err);
    res.status(500).send('회원 조회 중 오류가 발생했습니다.');
  }
});

// 회원가입
app.post('/api/users', async (req, res) => {
  const { username, password, name, email } = req.body;

  const sql = 'INSERT INTO users(username, password, name, email) '
            + 'VALUES ($1, $2, $3, $4)';

  try {
    await db.query(sql, [username, password, name, email]);
    res.send('회원 가입 완료!!');
  } catch (err) {
    console.log('회원 가입 오류!', err);
    res.status(500).send('회원 가입 중 오류가 발생했습니다.');
  }
});


// 로그인
app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;

  const sql = `
    SELECT id, username, name, email, role
    FROM users
    WHERE username = $1 AND password = $2
  `;

  try {
    const result = await db.query(sql, [username, password]);

    if (result.rows.length === 0) {
      return res.status(401).send(
        '아이디 또는 비밀번호가 올바르지 않습니다.'
      );
    }

    res.json({
      message: '로그인 성공',
      user: result.rows[0],
    });
  } catch (err) {
    console.log('로그인 오류!', err);
    res.status(500).send('로그인 중 오류가 발생했습니다.');
  }
});


app.put('/api/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: '올바르지 않은 회원 번호입니다.',
    });
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    !name.trim() ||
    !email.trim()
  ) {
    return res.status(400).json({
      message: '이름과 이메일을 입력해 주세요.',
    });
  }

  try {
    const sql = `
      UPDATE users
      SET name = $1, email = $2
      WHERE id = $3
      RETURNING id, username, name, email, role
    `;

    const result = await db.query(sql, [
      name.trim(),
      email.trim(),
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: '회원을 찾을 수 없습니다.',
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('회원정보 변경 오류:', err);

    res.status(500).json({
      message: '회원정보 변경 중 오류가 발생했습니다.',
    });
  }
});



// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행중... http://localhost:${PORT}`);
});
