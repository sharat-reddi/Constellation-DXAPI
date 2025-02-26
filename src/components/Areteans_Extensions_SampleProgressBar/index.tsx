import { useState, useEffect } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
import axios from 'axios';
import StyledAreteansExtensionsSampleProgressBarWrapper, {
  ProgressContainer,
  ProgressBar,
  IconTitleContainer,
  Icon,
  Title,
  TopRightText,
  BottomLeftText,
  BottomRightText,
  UploadedData
} from './styles';

interface ProgressBarProps {
  progressValue: number;
  statusLabel: string;
  timeIndicator?: string;
  icon?: string;
  title?: string;
  idleColor?: string;
  activeColor?: string;
  successColor?: string;
  errorColor?: string;
  showUploadButton?: boolean;
}

function AreteansExtensionsSampleProgressBar(props: ProgressBarProps) {
  const {
    progressValue = 0,
    statusLabel = 'Waiting...',
    timeIndicator,
    icon,
    title,
    idleColor = '#e0e0e0',
    activeColor = '#007bff',
    successColor = '#28a745',
    errorColor = '#dc3545',
    showUploadButton = true
  } = props;

  const [state, setState] = useState<'Idle' | 'Active' | 'Success' | 'Error'>('Idle');
  const [progress, setProgress] = useState<number>(progressValue);
  const [uploaded, setUploaded] = useState<number>(0);
  const [totalSize, setTotalSize] = useState<number>(0);

  useEffect(() => {
    setProgress(progressValue);
  }, [progressValue]);

  const getProgressBarColor = () => {
    switch (state) {
      case 'Idle':
        return idleColor;
      case 'Active':
        return activeColor;
      case 'Success':
        return successColor;
      case 'Error':
        return errorColor;
      default:
        return idleColor;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setTotalSize(file.size / (1024 * 1024)); // Convert to MB
      setState('Active');

      axios.post('YOUR_UPLOAD_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
            setProgress(percentComplete);
            setUploaded(progressEvent.loaded / (1024 * 1024)); // Convert to MB
          }
        }
      })
      .then((response) => {
        console.log('Upload success:', response);
        setState('Success');
      })
      .catch((error) => {
        console.error('Upload error:', error);
        setState('Error');
      });
    }
  };

  return (
    <StyledAreteansExtensionsSampleProgressBarWrapper>
      <IconTitleContainer>
        {icon && <Icon src={icon} alt={title} />}
        <Title>{title}</Title>
      </IconTitleContainer>

      <ProgressContainer>
        <ProgressBar state={state} style={{ width: `${progress}%`, backgroundColor: getProgressBarColor() }} />
      </ProgressContainer>

      <TopRightText>{progress.toFixed(2)}%</TopRightText>
      <BottomLeftText>{statusLabel}</BottomLeftText>
      <BottomRightText>{timeIndicator}</BottomRightText>

      {showUploadButton && (
        <input style={{ marginTop: '15px' }} type='file' onChange={handleFileUpload} />
      )}

      <UploadedData>
        {uploaded.toFixed(2)} / {totalSize.toFixed(2)} MB
      </UploadedData>
    </StyledAreteansExtensionsSampleProgressBarWrapper>
  );
}

export default withConfiguration(AreteansExtensionsSampleProgressBar);
