
import express from 'express';
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const app = express();
const PORT = process.env.PORT || 8000;

// ========================================
// 1. 미들웨어 설정
// ========================================

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ========================================
// 2. PostgreSQL 연결 설정
// ========================================

const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'jsuser',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'jsdb'
});

// ========================================
// 3. 기본 페이지
// ========================================

app.get('/', (req, res) => {
  res.send('<h2>Hello Express + PostgreSQL</h2>');
});

// ========================================
// 4. 전체 상품 조회 (GET)
// ========================================

app.get('/api/products', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, product_name AS name, price, created_at
       FROM product
       ORDER BY id ASC`
    );

    res.status(200).json(result.rows);

  } catch (err) {
    console.error('상품 조회 오류:', err);

    res.status(500).json({
      message: '상품 조회 실패'
    });
  }
});

// ========================================
// 5. 특정 상품 조회 (GET)
// ========================================

app.get('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: '올바른 상품 ID를 입력해주세요.'
      });
    }

    const result = await db.query(
      `SELECT id, product_name AS name, price, created_at
       FROM product
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: '상품을 찾을 수 없습니다.'
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (err) {
    console.error('상품 상세 조회 오류:', err);

    res.status(500).json({
      message: '상품 상세 조회 실패'
    });
  }
});

// ========================================
// 6. 상품 등록 (POST)
// ========================================

app.post('/api/products', async (req, res) => {
  try {
    const { name, price } = req.body ?? {};

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      name.length > 100 ||
      typeof price !== 'number' ||
      !Number.isSafeInteger(price) ||
      price < 0 ||
      price > 2147483647
    ) {
      return res.status(400).json({
        message: '상품명과 가격을 올바르게 입력해주세요.'
      });
    }

    const result = await db.query(
      `INSERT INTO product (product_name, price)
       VALUES ($1, $2)
       RETURNING id`,
      [name.trim(), price]
    );

    res.status(201).json({
      message: '상품이 등록되었습니다.',
      product: {
        id: result.rows[0].id,
        name: name.trim(),
        price
      }
    });

  } catch (err) {
    console.error('상품 등록 오류:', err);

    res.status(500).json({
      message: '상품 등록 실패'
    });
  }
});

// ========================================
// 7. 상품 수정 (PUT)
// ========================================

app.put('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, price } = req.body ?? {};

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: '올바른 상품 ID를 입력해주세요.'
      });
    }

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      name.length > 100 ||
      typeof price !== 'number' ||
      !Number.isSafeInteger(price) ||
      price < 0 ||
      price > 2147483647
    ) {
      return res.status(400).json({
        message: '상품 정보를 올바르게 입력해주세요.'
      });
    }

    const result = await db.query(
      `UPDATE product
       SET product_name = $1, price = $2
       WHERE id = $3`,
      [name.trim(), price, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: '상품을 찾을 수 없습니다.'
      });
    }

    res.status(200).json({
      message: '상품이 수정되었습니다.',
      product: {
        id,
        name: name.trim(),
        price
      }
    });

  } catch (err) {
    console.error('상품 수정 오류:', err);

    res.status(500).json({
      message: '상품 수정 실패'
    });
  }
});

// ========================================
// 8. 상품 삭제 (DELETE)
// ========================================

app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: '올바른 상품 ID를 입력해주세요.'
      });
    }

    const result = await db.query(
      'DELETE FROM product WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: '상품을 찾을 수 없습니다.'
      });
    }

    res.status(200).json({
      message: '상품이 삭제되었습니다.',
      deletedId: id
    });

  } catch (err) {
    console.error('상품 삭제 오류:', err);

    res.status(500).json({
      message: '상품 삭제 실패'
    });
  }
});

// ========================================
// 9. PostgreSQL 연결 확인 및 서버 실행
// ========================================

try {
  const connection = await db.connect();

  console.log('PostgreSQL에 연결되었습니다.');
  connection.release();

  app.listen(PORT, () => {
    console.log(
      `서버 실행중... http://localhost:${PORT}`
    );
  });

} catch (err) {
  console.error('PostgreSQL 연결 실패:', err.message);
  process.exitCode = 1;
  await db.end();
}

