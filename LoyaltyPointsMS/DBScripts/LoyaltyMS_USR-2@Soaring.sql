SELECT BALANCES.CUSTOMERID, BALANCES.BALANCE, CASE WHEN BALANCES.BALANCE >= 400 THEN 'PLATINUM' WHEN BALANCES.BALANCE >= 200 THEN 'GOLD' WHEN BALANCES.BALANCE >= 100 THEN 'SILVER' WHEN BALANCES.BALANCE >= 0 THEN 'STANDARD' END AS TIER FROM (SELECT CUSTOMERID, SUM(LOYALTYPOINTS) AS BALANCE FROM LOYALTYPOINTMOVEMENTS WHERE MOVEMENTDATE <= TO_DATE('2018-04-09 00:00:00', 'YYYY-MM-DD HH24:MI:SS') GROUP BY CUSTOMERID) BALANCES