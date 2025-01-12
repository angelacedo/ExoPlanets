import { ClipLoader } from "react-spinners";


export default (isLoading: boolean, size: number, cssOverride?: React.CSSProperties) => <ClipLoader
          color={'var(--secondary-color)'}
          loading={isLoading}
          cssOverride={cssOverride}
          size={size}
          aria-label="Loading Spinner"
          data-testid="loader"
        />