import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box,
  Alert,
  Divider,
  Grid,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  Tab,
  Tabs
} from '@mui/material';

function AdminPage() {
  const [situationSystemPrompt, setSituationSystemPrompt] = useState('');
  const [formulaSystemPrompt, setFormulaSystemPrompt] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [activeTab, setActiveTab] = useState(0);

  // 초기 프롬프트 설정값
  const defaultSituationPrompt = '당신은 Excel 전문가입니다. 사용자가 설명한 상황을 바탕으로 가장 적합한 Excel 함수를 추천하고, 수식 생성에 필요한 셀 정보를 요청하세요.';
  const defaultFormulaPrompt = '당신은 Excel 전문가입니다. 사용자의 요구사항과 셀 정보를 바탕으로 정확한 Excel 함수 수식을 생성하세요.';

  // 컴포넌트 마운트 시 로컬 스토리지에서 프롬프트 불러오기
  useEffect(() => {
    const savedSituationPrompt = localStorage.getItem('situationSystemPrompt');
    const savedFormulaPrompt = localStorage.getItem('formulaSystemPrompt');
    
    setSituationSystemPrompt(savedSituationPrompt || defaultSituationPrompt);
    setFormulaSystemPrompt(savedFormulaPrompt || defaultFormulaPrompt);
  }, []);

  // 상황 분석 프롬프트 저장
  const handleSaveSituationPrompt = () => {
    if (situationSystemPrompt.trim()) {
      localStorage.setItem('situationSystemPrompt', situationSystemPrompt);
      setAlert({ 
        open: true, 
        message: '상황 분석 프롬프트가 저장되었습니다.', 
        severity: 'success' 
      });
    } else {
      setAlert({ 
        open: true, 
        message: '프롬프트를 입력해주세요.', 
        severity: 'error' 
      });
    }
  };

  // 수식 생성 프롬프트 저장
  const handleSaveFormulaPrompt = () => {
    if (formulaSystemPrompt.trim()) {
      localStorage.setItem('formulaSystemPrompt', formulaSystemPrompt);
      setAlert({ 
        open: true, 
        message: '수식 생성 프롬프트가 저장되었습니다.', 
        severity: 'success' 
      });
    } else {
      setAlert({ 
        open: true, 
        message: '프롬프트를 입력해주세요.', 
        severity: 'error' 
      });
    }
  };

  // 초기 프롬프트로 복원
  const handleResetSituationPrompt = () => {
    setSituationSystemPrompt(defaultSituationPrompt);
    localStorage.setItem('situationSystemPrompt', defaultSituationPrompt);
    setAlert({ 
      open: true, 
      message: '상황 분석 프롬프트가 초기화되었습니다.', 
      severity: 'info' 
    });
  };

  const handleResetFormulaPrompt = () => {
    setFormulaSystemPrompt(defaultFormulaPrompt);
    localStorage.setItem('formulaSystemPrompt', defaultFormulaPrompt);
    setAlert({ 
      open: true, 
      message: '수식 생성 프롬프트가 초기화되었습니다.', 
      severity: 'info' 
    });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Excel 함수 생성 도우미 - 관리자 페이지
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
          AI 프롬프트를 관리하고 설정할 수 있습니다.
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab label="상황 분석 프롬프트" />
            <Tab label="수식 생성 프롬프트" />
          </Tabs>
        </Box>

        {/* 상황 분석 프롬프트 탭 */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    상황 분석 프롬프트 설정
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    사용자의 상황 설명을 바탕으로 Excel 함수를 추천하는 AI의 지시사항을 수정할 수 있습니다.
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    variant="outlined"
                    label="System 프롬프트"
                    value={situationSystemPrompt}
                    onChange={(e) => setSituationSystemPrompt(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body2" color="textSecondary" paragraph>
                    사용자 프롬프트: "엑셀에서 다음 상황에 적합한 함수를 추천해주세요: [사용자 입력]"
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSaveSituationPrompt}
                  >
                    저장하기
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={handleResetSituationPrompt}
                    sx={{ ml: 1 }}
                  >
                    기본값으로 초기화
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* 수식 생성 프롬프트 탭 */}
        {activeTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    수식 생성 프롬프트 설정
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    사용자가 입력한 셀 정보를 바탕으로 Excel 수식을 생성하는 AI의 지시사항을 수정할 수 있습니다.
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    variant="outlined"
                    label="System 프롬프트"
                    value={formulaSystemPrompt}
                    onChange={(e) => setFormulaSystemPrompt(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body2" color="textSecondary" paragraph>
                    사용자 프롬프트: "상황: [상황]\n\n셀 정보: [셀 정보]\n\n정확한 엑셀 함수 수식을 생성해주세요."
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSaveFormulaPrompt}
                  >
                    저장하기
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={handleResetFormulaPrompt}
                    sx={{ ml: 1 }}
                  >
                    기본값으로 초기화
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        )}
      </Paper>

      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AdminPage; 