import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box, 
  CircularProgress,
  Alert,
  Divider,
  Grid
} from '@mui/material';
import axios from 'axios';

function UserPage() {
  const [situation, setSituation] = useState('');
  const [cellInfo, setCellInfo] = useState('');
  const [formula, setFormula] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleSituationSubmit = async () => {
    if (!situation.trim()) {
      setError('상황을 입력해주세요.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4.1',
          messages: [
            {
              role: 'system',
              content: localStorage.getItem('situationSystemPrompt') || '당신은 Excel 전문가입니다. 사용자가 설명한 상황을 바탕으로 가장 적합한 Excel 함수를 추천하고, 수식 생성에 필요한 셀 정보를 요청하세요.'
            },
            {
              role: 'user',
              content: `엑셀에서 다음 상황에 적합한 함수를 추천해주세요: ${situation}`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
          }
        }
      );

      const recommendationText = response.data.choices[0].message.content;
      setRecommendation(recommendationText);
    } catch (err) {
      console.error('Error calling OpenAI API:', err);
      setError('AI 함수 추천 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleCellInfoSubmit = async () => {
    if (!cellInfo.trim()) {
      setError('셀 정보를 입력해주세요.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4.1',
          messages: [
            {
              role: 'system',
              content: localStorage.getItem('formulaSystemPrompt') || '당신은 Excel 전문가입니다. 사용자의 요구사항과 셀 정보를 바탕으로 정확한 Excel 함수 수식을 생성하세요.'
            },
            {
              role: 'user',
              content: `상황: ${situation}\n\n셀 정보: ${cellInfo}\n\n정확한 엑셀 함수 수식을 생성해주세요.`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
          }
        }
      );

      const formulaText = response.data.choices[0].message.content;
      setFormula(formulaText);
    } catch (err) {
      console.error('Error calling OpenAI API:', err);
      setError('함수 수식 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSituation('');
    setCellInfo('');
    setFormula('');
    setRecommendation('');
    setError('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Excel 함수 생성 도우미
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
          상황을 설명하면 AI가 최적의 Excel 함수를 추천해드립니다
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* 첫 번째 단계: 상황 입력 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                1. 상황 입력
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" gutterBottom>
                원하는 Excel 기능에 대한 상황을 설명해주세요
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="예: 특정 조건을 만족하는 경우에만 데이터를 더하고 싶어요"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                sx={{ mb: 2, mt: 1 }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSituationSubmit}
                disabled={loading || !situation.trim()}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : '함수 추천 받기'}
              </Button>
            </Paper>
          </Grid>

          {/* 두 번째 단계: AI 함수 추천 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                2. AI 함수 추천
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box 
                sx={{ 
                  backgroundColor: '#f8f9fa', 
                  p: 2, 
                  borderRadius: 1, 
                  minHeight: '150px',
                  mb: 2
                }}
              >
                <Typography variant="body2" component="div" sx={{ whiteSpace: 'pre-line' }}>
                  {recommendation || '상황을 입력하고 함수 추천을 받으면 여기에 표시됩니다.'}
                </Typography>
              </Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="특정 셀의 위치와 기준 및 조건을 입력해주세요. 예: A1:A10 범위에 있는 값 중 B1:B10의 값이 100보다 큰 경우에만 합계를 구하고 싶습니다."
                value={cellInfo}
                onChange={(e) => setCellInfo(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleCellInfoSubmit}
                disabled={loading || !cellInfo.trim() || !recommendation}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : '함수 수식 생성하기'}
              </Button>
            </Paper>
          </Grid>

          {/* 세 번째 단계: 함수 수식 생성 결과 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                3. 생성된 함수 수식
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box 
                sx={{ 
                  backgroundColor: '#e8f5e9', 
                  p: 2, 
                  borderRadius: 1,
                  minHeight: '250px'
                }}
              >
                <Typography variant="body2" component="div" sx={{ whiteSpace: 'pre-line', fontWeight: formula ? 'bold' : 'normal' }}>
                  {formula || '셀 정보를 입력하고 함수 수식을 생성하면 여기에 표시됩니다.'}
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={handleReset}
                sx={{ mt: 2 }}
                fullWidth
              >
                모두 초기화
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserPage; 