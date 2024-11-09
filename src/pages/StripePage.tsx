import React, { useEffect, useRef, useState } from "react";
import { useRequest } from "ahooks";
import ExhibitCard from "../components/ExhibitCard";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";

import { ExhibitI } from "../interfaces/ExihibitI";
import { useSocket } from "../components/Notification/useNotificationHook";

interface StripePageProps {
  fetchFunction: (page: number, limit: number) => Promise<any>;
}

const StripePage: React.FC<StripePageProps> = ({ fetchFunction }) => {
  const [page, setPage] = useState<number>(1);
  const [exhibits, setExhibits] = useState<ExhibitI[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { openSnackbar, message, setOpenSnackbar, topOfPageRef, isAtTopRef } =
    useSocket();

  const { data, loading } = useRequest(() => fetchFunction(page, 10), {
    refreshDeps: [page],
    onSuccess: (newData) => {
      setExhibits((prev) => [...prev, ...newData.data]);
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < (data?.lastPage || 1)) {
        setPage((prev) => prev + 1);
      }
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [data, page]);

  return (
    <Container maxWidth="md" ref={topOfPageRef}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Exhibits
      </Typography>

      <Stack direction="column" spacing={2}>
        {exhibits.map((exhibit) => (
          <Box key={exhibit.id}>
            <ExhibitCard exhibit={exhibit} />
          </Box>
        ))}
      </Stack>

      {loading && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="info">
          {message}
        </Alert>
      </Snackbar>

      <div ref={loaderRef} />
    </Container>
  );
};

export default StripePage;
