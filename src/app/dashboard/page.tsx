import Image from "next/image";
import OrdersTable from "./OrdersTable";
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";
import "./page.scss";

export default async function DashboardPage() {
  const getImgCards = () => {
    const imgs = [];
    for (let i = 1; i <= 10; i++) {
      imgs.push(
        <Image
          key={i}
          src={`/pic_${i}.png`}
          width={280}
          height={85}
          alt={`Dashboard pic${i}.png`}
        />
      );
    }
    return imgs;
  };

  return (
    <>
      <div className="dashboard-account-info mb-4">
        <div className="dashboard-account-info-item">
          {/* <Image src="/heart.png" width={46} height={46} alt="heart icon" /> */}
          <div>
            <p className="account-field">Account Nickname</p>
            <p className="account-value">xxxxxxx</p>
          </div>
        </div>

        <div className="dashboard-account-info-item">
          {/* <Image src="/id_card.png" width={46} height={46} alt="id_card icon" /> */}
          <div>
            <p className="account-field">Account ID</p>
            <p className="account-value">xxxxxxx</p>
          </div>
        </div>

        <div className="dashboard-account-info-item">
          {/* <Image
            src="/bookmark.png"
            width={46}
            height={46}
            alt="bookmark icon"
          /> */}
          <div>
            <p className="account-field">Account Number</p>
            <p className="account-value">xxxxxxx</p>
          </div>
        </div>

        <div className="dashboard-account-info-item">
          {/* <Image src="/cloud.png" width={46} height={46} alt="cloud icon" /> */}
          <div>
            <p className="account-field">Create Date</p>
            <p className="account-value">xxxxxxx</p>
          </div>
        </div>
      </div>

      <div className="dashboard-imgs-box mb-4">{getImgCards()}</div>

      {/* 👇 Admin Side 👇 */}
      <div className="dashboard-mid main-card-light mb-4">
        <div className="main-title-contaienr mb-8">
          <p className="main-title">Unmatching Orders</p>
        </div>
        <OrdersTable />
      </div>

      <div className="dashboard-foot">
        <div className="main-card-light">
          <div className="main-title-contaienr mb-8">
            <div className="main-title">
              <span>Orders</span>
              <>
                <span className="main-title-desc">
                  <span style={{ color: "#883cae" }}>50 </span>
                  Orders this Week
                </span>
              </>
            </div>
          </div>
          <ChartOne />
        </div>

        <div className="main-card-light">
          <div className="main-title-contaienr mb-8">
            <div className="main-title">
              <span>Order Matchings</span>
              <>
                <span className="main-title-desc">
                  <span style={{ color: "#883cae" }}>50 </span>
                  Executions and
                  <span style={{ color: "#883cae" }}>40 </span>
                  Allocations this Week
                </span>
              </>
            </div>
          </div>
          <ChartTwo />
        </div>

        <div className="main-card-light">
          <div className="main-title-contaienr mb-8">
            <div className="main-title">
              <span>Investors</span>
              <>
                <span className="main-title-desc">
                  <span style={{ color: "#883cae" }}>50 </span>
                  Investors this Month
                </span>
              </>
            </div>
          </div>
          <ChartThree />
        </div>
      </div>
      {/* 👆 Admin Side 👆 */}
    </>
  );
}
