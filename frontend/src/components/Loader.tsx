import { ClipLoader } from "react-spinners";


export default (isLoading: boolean, size: number, cssOverride?: React.CSSProperties) => <ClipLoader
          color={'var(--info-color)'}
          loading={isLoading}
          cssOverride={cssOverride}
          size={size}
          aria-label="Loading Spinner"
          data-testid="loader"
        />