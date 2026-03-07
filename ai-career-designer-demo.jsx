import { useState, useEffect, useCallback, useRef } from "react";

/* ================================================================
   SECTION 1 : DATA — questions / typeProfiles / interviewQuestions / interviewRubric / products
   ================================================================ */
const QUESTIONS=[{id:"q01",text:"新しいプロジェクトに誘われたとき、あなたはどう感じますか？",choices:{a:"ワクワクする。すぐにやりたいと思う",b:"面白そうだが、まず情報を集めてから判断したい",c:"今の仕事に集中したいので、余裕があれば考える",d:"正直、今の仕事が安定しているので動きたくない"},sm:{a:{action:3,independence:1},b:{expertise:2,action:1},c:{stability:2,expertise:1},d:{stability:3}}},{id:"q02",text:"自分の考えや成果を人に伝えることについて、どう思いますか？",choices:{a:"積極的に発信したい。SNSやブログも好き",b:"必要な場面では伝えるが、自分から発信するタイプではない",c:"求められれば話すが、自分からはあまり発信しない",d:"目立つのは苦手。成果は黙って見せたい"},sm:{a:{expression:3,independence:1},b:{expression:1,action:1},c:{stability:1,expertise:1},d:{expertise:2,stability:1}}},{id:"q03",text:"仕事でスキルアップするとしたら、どちらを選びますか？",choices:{a:"一つの分野を徹底的に極めたい",b:"専門性は持ちつつ、隣接領域も広げたい",c:"いろいろな分野を広く浅く経験したい",d:"スキルアップより、人間関係や環境を重視したい"},sm:{a:{expertise:3},b:{expertise:2,action:1},c:{action:2,expression:1},d:{stability:2,stress:1}}},{id:"q04",text:"「自分で事業をやってみないか」と言われたら？",choices:{a:"前向きに検討する。いつかやりたいと思っていた",b:"副業レベルならやってみたい",c:"興味はあるがリスクが怖い",d:"組織に属している方が安心する"},sm:{a:{independence:3,action:1},b:{independence:2,action:1},c:{independence:1,stability:1},d:{stability:3}}},{id:"q05",text:"職場の人間関係でストレスを感じたとき、あなたはどうしますか？",choices:{a:"直接話し合って解決しようとする",b:"信頼できる人に相談する",c:"時間が解決すると思って距離を置く",d:"かなりストレスを溜め込んでしまう方だ"},sm:{a:{stress:3,expression:1},b:{stress:2,stability:1},c:{stability:1,independence:1},d:{expertise:1}}},{id:"q06",text:"仕事で一番大切にしていることは何ですか？",choices:{a:"成長実感。昨日の自分より進んでいること",b:"安定収入。生活基盤がしっかりしていること",c:"自由度。自分のやり方で進められること",d:"影響力。自分の仕事が誰かの役に立つこと"},sm:{a:{action:2,expertise:1},b:{stability:3},c:{independence:3},d:{expression:2,stress:1}}},{id:"q07",text:"理想の働き方に近いのはどれですか？",choices:{a:"フルリモートで、自分のペースで成果を出す",b:"チームで協力しながら、決まった時間に働く",c:"多くの人と関わりながら、刺激のある毎日を送る",d:"黙々と専門的な作業に没頭する"},sm:{a:{independence:2,action:1},b:{stability:2,stress:1},c:{expression:2,action:1},d:{expertise:3}}},{id:"q08",text:"転職や大きなキャリア変更について、どう考えていますか？",choices:{a:"常にアンテナを張っている。良い機会があれば動く",b:"今の仕事に不満があるわけではないが、選択肢は持ちたい",c:"今の仕事を続けながら、副業で可能性を探りたい",d:"大きな変化は望まない。今のキャリアを深めたい"},sm:{a:{action:3,independence:1},b:{action:1,stability:1},c:{independence:2,stability:1},d:{stability:2,expertise:1}}},{id:"q09",text:"チームで仕事をするとき、あなたが自然と担う役割は？",choices:{a:"リーダーやまとめ役",b:"専門家やアドバイザー",c:"調整役やサポーター",d:"独立して動く実行者"},sm:{a:{expression:3,stress:1},b:{expertise:2,expression:1},c:{stability:2,stress:1},d:{independence:2,action:1}}},{id:"q10",text:"仕事で大きな壁にぶつかったとき、あなたのタイプは？",choices:{a:"やり方を変えて別のアプローチを試す",b:"徹底的に原因を分析してから動く",c:"周りに助けを求めて一緒に乗り越える",d:"耐えて待つ。状況が変わるのを信じる"},sm:{a:{action:2,independence:1},b:{expertise:2,action:1},c:{expression:1,stress:2},d:{stability:2}}},{id:"q11",text:"副業をするとしたら、どんなことをやりたいですか？",choices:{a:"自分のスキルを活かしたコンサルやアドバイス",b:"ブログ・SNS・動画などの情報発信",c:"物販やサービスなど、自分のビジネスを立ち上げたい",d:"副業にはあまり興味がない。本業に集中したい"},sm:{a:{expertise:2,independence:1},b:{expression:3},c:{independence:3,action:1},d:{stability:2,expertise:1}}},{id:"q12",text:"5年後の自分はどうなっていたいですか？",choices:{a:"新しいことに挑戦し続けて、いくつもの経験を積んでいたい",b:"特定の分野で「この人に聞けば間違いない」と言われる存在になりたい",c:"安定した収入と生活基盤の上で、余裕を持って暮らしたい",d:"自分の名前で仕事をして、自由に働いていたい"},sm:{a:{action:3,expression:1},b:{expertise:3},c:{stability:3},d:{independence:3,expression:1}}}];

const TYPES = {
  explorer:{label:"探索成長型",kana:"たんさくせいちょうがた",tagline:"新しい挑戦で成長し続ける人",accent:"#c4573a",strengths:["未知の領域に飛び込む行動力","変化をチャンスに変える適応力","多様な経験から学びを引き出す力"],cautions:["興味が移りやすく集中しにくい面がある","安定した環境に物足りなさを感じやすい"],envs:["成長フェーズの企業","新規事業部門","複数プロジェクト並行チーム"],freeAdvice:"まずは小さく試すことから始めてみてください。",stumble:[{pt:"転職理由が散漫になりやすい",why:"多くの経験があるため「なぜ次はここなのか」の軸がぼやける",ex:"「いろいろやってきましたが…」と始めてしまい一貫性を疑われる"},{pt:"強みの焦点が定まらない",why:"複数の強みがあるため1つに絞りきれず抽象的になる",ex:"「適応力があります」だけで具体的成果が見えない"},{pt:"長期定着への不安を与えやすい",why:"変化を好む性格が「すぐ辞めるのでは」と映る",ex:"過去の転職回数について深掘りされたとき説明できない"}],improved:"私の強みは「変化に強い適応力」です。\n\n前職では新規事業立ち上げに3度携わり、毎回異なる業界・チーム構成の中で成果を出してきました。直近では、ゼロから始めたBtoBサービスを6ヶ月で月間売上500万円まで成長させました。\n\n未知の環境でも素早くキャッチアップし、行動しながら学べる力を御社でも活かしたいと考えています。"},
  specialist:{label:"専門深化型",kana:"せんもんしんかがた",tagline:"一つの分野で圧倒的な存在になる人",accent:"#2d6a4f",strengths:["深い専門知識を築く集中力","論理的に問題を解決する力","質へのこだわりと精度の高さ"],cautions:["専門外への関心が薄くなりがち","完璧を追い求めすぎることがある"],envs:["専門職が評価される組織","研究開発部門","コンサルティングファーム"],freeAdvice:"専門性を言語化し、市場での希少性を高めることが次のステップです。",stumble:[{pt:"専門用語を使いすぎる",why:"深い知識があるがゆえに面接官のレベルに合わせた説明ができない",ex:"技術的な説明に終始し「で、何ができるの？」と聞き返される"},{pt:"柔軟性への疑問を持たれやすい",why:"専門特化型のため新しい領域への対応力を問われる",ex:"「専門外のことを頼まれたらどうしますか？」に詰まる"},{pt:"チームでの貢献が見えにくい",why:"個人の専門性は高いがチームへの波及効果を語れない",ex:"「一人で成果を出した」話ばかりで協調性が伝わらない"}],improved:"私の強みは「専門領域での深い問題解決力」です。\n\nデータ分析の領域で5年間の経験があり、直近ではマーケティングチームのKPI設計を担当しました。分析基盤の再構築により、レポート作成時間を80%削減し、意思決定スピードの向上に貢献しました。\n\nこの専門性を活かして、御社のデータドリブンな意思決定を支援したいと考えています。"},
  builder:{label:"安定構築型",kana:"あんていこうちくがた",tagline:"着実に土台を積み上げていく人",accent:"#5a4a3a",strengths:["長期的な計画を立てて実行する力","信頼関係を構築する誠実さ","チームの安定感を生み出す力"],cautions:["変化のスピードが速い環境にストレスを感じやすい","慎重すぎてチャンスを逃すことがある"],envs:["制度が整った大手企業","バックオフィス部門","インフラ系事業"],freeAdvice:"小さな変化を取り入れる習慣が成長につながります。",stumble:[{pt:"自己PRが控えめすぎる",why:"謙虚さが裏目に出て強みを十分にアピールできない",ex:"「普通のことをしてきただけです」と言い印象に残らない"},{pt:"変化への意欲が伝わりにくい",why:"安定志向が「成長意欲がない」と解釈されることがある",ex:"「なぜ転職するのか」への回答が消極的に聞こえる"},{pt:"具体的な実績の数値化が弱い",why:"日々の積み上げ型の仕事はインパクトのある数字にしにくい",ex:"「コツコツやってきました」では面接官の記憶に残らない"}],improved:"私の強みは「着実に成果を積み上げる実行力」です。\n\n現職では3年間カスタマーサポート体制の改善を担当してきました。マニュアルの整備とチーム教育を地道に進めた結果、顧客満足度を72%から91%まで向上させました。\n\n目の前の課題に誠実に向き合い、長期的な改善を続けられる力を御社でも発揮したいです。"},
  pioneer:{label:"独立先行型",kana:"どくりつせんこうがた",tagline:"自分の力で道を切り拓く人",accent:"#1a3a5c",strengths:["自律的に動ける判断力と実行力","リスクを取って前に進む覚悟","自分の価値観を軸にした意思決定力"],cautions:["人に頼ることが苦手な面がある","組織のルールに窮屈さを感じやすい"],envs:["フリーランス・独立","スタートアップ創業期","裁量の大きいポジション"],freeAdvice:"副業や小さな事業から始めることで独立の適性をさらに確認できます。",stumble:[{pt:"協調性への疑問を持たれやすい",why:"独立志向が強いため「チームで働けるか」を問われる",ex:"「自分で全部やりたい」という印象を与えてしまう"},{pt:"組織への適応意欲が見えにくい",why:"自由を重視するためルールや方針への従順さが疑われる",ex:"「御社の方針に従います」が嘘くさく聞こえる"},{pt:"長期コミットの説得力が弱い",why:"独立志向が「腰掛けでは」と映るリスクがある",ex:"「将来は独立したい」と正直に言ってしまう"}],improved:"私の強みは「自律的に判断し、推進する実行力」です。\n\n前職では社内で誰も手をつけなかった業務効率化プロジェクトを自ら提案しリーダーとして推進しました。3ヶ月で既存プロセスの40%を自動化し、チーム全体で月30時間の工数削減を実現しました。\n\n自ら課題を見つけて動ける力を御社の事業推進でも活かしたいと考えています。"},
  influencer:{label:"発信牽引型",kana:"はっしんけんいんがた",tagline:"言葉と影響力で周囲を動かす人",accent:"#8b6914",strengths:["人を巻き込むコミュニケーション力","ビジョンを伝えるプレゼン力","チームを引っ張るリーダーシップ"],cautions:["自分の意見を通しすぎることがある","一人で地道にやる作業が苦手な面がある"],envs:["営業・マーケティング部門","マネジメントポジション","コミュニティ運営"],freeAdvice:"発信や情報共有を副業に活かすことも選択肢の一つです。",stumble:[{pt:"話が長くなりがち",why:"コミュニケーション力が高いがゆえに簡潔にまとめる力が不足する",ex:"1分の質問に3分以上話し続けてしまう"},{pt:"実務スキルの具体性が弱い",why:"人を動かす力はあるが自分自身の手を動かした実績を語りにくい",ex:"「リーダーシップがあります」の裏付けが曖昧"},{pt:"謙虚さが足りない印象を与えやすい",why:"自信を持って話せるため時に「自慢話」に聞こえてしまう",ex:"「私がいたから成功した」という語り方になる"}],improved:"私の強みは「チームを巻き込み、成果に導くリーダーシップ」です。\n\n直近のプロジェクトでは部門横断の10名チームのリーダーを担当しました。メンバーの強みを活かした役割分担と週次の進捗共有を徹底した結果、当初の計画より2週間前倒しでリリースできました。\n\n人を動かしチームの力を最大化する力を御社でも活かしたいと考えています。"},
};

const CL={action:"行動志向",stability:"安定志向",expression:"発信性",expertise:"専門性",independence:"独立適性",stress:"ストレス耐性"};

const PRODUCTS=[
  {slug:"interview-rehearsal",name:"AI面接リハーサル",price:3980,tagline:"面接で詰まらないための練習",features:["想定質問20問のAI模擬面接","回答ごとの詳細フィードバック","改善版回答の自動生成","タイプ別の弱点克服メニュー","制限時間トレーニング","回数無制限"],cta:"あなた専用の面接練習を始める"},
  {slug:"pr-improvement",name:"自己PR・志望動機 改善パック",price:4980,tagline:"自己PRと回答を改善する",features:["自己PR 3パターン生成","志望動機 3パターン生成","面接官視点のレビュー","伝え方の方向性アドバイス"],cta:"自己PRと回答を改善する"},
  {slug:"intensive-7day",name:"面接直前 7日集中プラン",price:2980,tagline:"面接直前の集中対策",features:["毎日3問の模擬面接","日替わりフィードバック","弱点集中トレーニング","最終日に総合評価レポート"],cta:"7日間の集中練習を始める"},
];

/* ================================================================
   SECTION 2 : LOGIC — diagnostic + interview evaluation
   ================================================================ */
const TB=["action","independence","expression","expertise","stability","stress"];
const CM={action:{action:"explorer",stability:"explorer",expression:"influencer",expertise:"explorer",independence:"pioneer",stress:"explorer"},stability:{action:"builder",stability:"builder",expression:"builder",expertise:"specialist",independence:"builder",stress:"builder"},expression:{action:"influencer",stability:"influencer",expression:"influencer",expertise:"specialist",independence:"pioneer",stress:"influencer"},expertise:{action:"specialist",stability:"specialist",expression:"influencer",expertise:"specialist",independence:"pioneer",stress:"specialist"},independence:{action:"pioneer",stability:"builder",expression:"influencer",expertise:"pioneer",independence:"pioneer",stress:"pioneer"},stress:{action:"explorer",stability:"builder",expression:"influencer",expertise:"specialist",independence:"pioneer",stress:"builder"}};

function calcScores(ans){const s={action:0,stability:0,expression:0,expertise:0,independence:0,stress:0};for(const[q,v]of Object.entries(ans)){const d=QUESTIONS.find(x=>x.id===q);if(!d)continue;const m=d.sm[v];if(!m)continue;for(const[c,p]of Object.entries(m)){if(c in s)s[c]+=p;}}return s;}

function detType(sc){const r=[...TB].sort((a,b)=>{const d=sc[b]-sc[a];return d!==0?d:TB.indexOf(a)-TB.indexOf(b);});const pt=CM[r[0]][r[1]];let st=CM[r[1]][r[2]];if(st===pt&&r[2]!==r[1])st=CM[r[2]][r[1]];return{primaryType:pt,secondaryType:st!==pt?st:null,pCat:r[0],sCat:r[1]};}

function evalAnswer(text,type){
  const t=text.trim();const len=t.length;
  const checks=[
    {label:"結論が先にあるか",w:0.25,score:(/強み|得意|自信|力/.test(t.slice(0,60))&&len>20)?80:len<10?20:50},
    {label:"具体的か",w:0.25,score:(/\d+/.test(t)&&/例えば|具体|とき|結果|年|月|件|%/.test(t))?90:/例えば|具体|とき|結果/.test(t)?70:len>80?50:30},
    {label:"具体例があるか",w:0.2,score:/経験|場面|プロジェクト|業務|担当|チーム|取り組/.test(t)?80:len>100?50:30},
    {label:"一貫性",w:0.15,score:len>120?75:len>60?60:40},
    {label:"長さは適切か",w:0.15,score:len<30?20:len<80?50:len>400?50:85},
  ];
  const overall=Math.round(checks.reduce((s,c)=>s+c.score*c.w,0));
  const good=checks.filter(c=>c.score>=70).map(c=>c.label+"の評価が高いです").slice(0,2);
  const bad=checks.filter(c=>c.score<70).map(c=>c.label+"をもう少し強化しましょう").slice(0,2);
  if(good.length<2)good.push("回答しようとする姿勢が大切です");
  if(bad.length<2)bad.push("「結論→具体例→活かし方」の型を意識しましょう");
  let comment=overall>=75?"良い回答です。構成がしっかりしており面接官に伝わる内容です。":overall>=50?"方向性は良いです。具体性を上げると印象に残ります。":"まずは「結論→具体例→活かし方」の型を意識してみましょう。";
  return{score:overall,comment:comment,good:good,bad:bad,improved:TYPES[type].improved,checks:checks};
}

/* ================================================================
   SECTION 3 : SERVICES via REGISTRY
   ================================================================ */
const elog=[];
const SR={
  analytics:{track:function(n,p){elog.push({e:n,ts:new Date().toISOString(),p:p});console.log("%c[Analytics] "+n,"color:#8b6914;font-weight:bold",p||"");}},
  payment:{createCheckout:function(p){return new Promise(function(r){setTimeout(function(){r({sid:"mock_"+Date.now(),ok:true});},800);});}},
  voice:{speak:function(t){console.log("%c[Voice] "+t.slice(0,40)+"...","color:#2d6a4f");},isRecording:function(){return false;}},
};

/* ================================================================
   SECTION 4 : STATE
   ================================================================ */
const SK="careerlab_v001";
function save(s){try{sessionStorage.setItem(SK,JSON.stringify(s));}catch(e){}}
function load(){try{const r=sessionStorage.getItem(SK);return r?JSON.parse(r):null;}catch(e){return null;}}
function clear(){try{sessionStorage.removeItem(SK);}catch(e){}}

/* ================================================================
   SECTION 5 : SHARED UI
   ================================================================ */
const FC='@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap");';
const V={"--cream":"#faf8f4","--warm":"#f3ede4","--ch":"#1a1a1a","--mu":"#6b6560","--lm":"#a09a93","--ln":"#ddd5ca","--ac":"#c4573a","--fd":'"Cormorant Garamond",serif',"--fb":'"Zen Kaku Gothic New",sans-serif'};
const B={fontFamily:"var(--fb)",color:"var(--ch)",WebkitFontSmoothing:"antialiased",lineHeight:1.7};

function G(){return (<style>{FC+" *,*::before,*::after{box-sizing:border-box;margin:0;padding:0} ::selection{background:var(--ac);color:#fff} @keyframes loadbar{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}"}</style>);}
function Nav({extra}){return (<nav style={{padding:"20px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid var(--ln)"}}><div style={{fontFamily:"var(--fd)",fontSize:22,fontWeight:700,letterSpacing:"-0.02em"}}>Career<span style={{fontStyle:"italic",fontWeight:400}}>Lab</span></div>{extra||null}</nav>);}
function Btn({children,onClick,ghost,style:s}){const[h,setH]=useState(false);const base=ghost?{padding:"14px 36px",fontSize:13,color:h?"var(--ch)":"var(--mu)",background:"none",border:"1px solid",borderColor:h?"var(--ch)":"var(--ln)"}:{padding:"18px 52px",fontSize:14,fontWeight:700,letterSpacing:"0.08em",color:"#fff",background:h?"var(--ac)":"var(--ch)",border:"none"};return (<button onClick={onClick} onMouseEnter={function(){setH(true);}} onMouseLeave={function(){setH(false);}} style={{...base,cursor:"pointer",transition:"all 0.4s ease",...(s||{})}}>{children}</button>);}
function Dv(){return (<div style={{maxWidth:820,margin:"0 auto",height:1,background:"var(--ln)"}}/>);}
function Lb({children}){return (<p style={{fontSize:12,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--lm)",marginBottom:20}}>{children}</p>);}

/* ================================================================
   SECTION 6 : PAGES
   ================================================================ */

// ─── LP ───
function LPPage({onStart}){
  const[m,setM]=useState(false);
  useEffect(function(){setM(true);SR.analytics.track("page_view",{path:"/"});},[]);
  function go(){SR.analytics.track("lp_cta_click");onStart();}
  return (<div style={{...B,minHeight:"100vh",background:"var(--cream)",...V}}><G/><Nav extra={<span style={{fontSize:11,color:"var(--lm)",letterSpacing:"0.15em",textTransform:"uppercase"}}>AI Interview Lab</span>}/>
    <section style={{padding:"80px 32px 100px",maxWidth:820,margin:"0 auto"}}><div style={{opacity:m?1:0,transform:m?"translateY(0)":"translateY(40px)",transition:"all 1s cubic-bezier(0.22,1,0.36,1)"}}>
      <p style={{fontSize:12,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--lm)",marginBottom:28}}>Career Diagnostic + Interview Rehearsal</p>
      <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(32px,7vw,60px)",fontWeight:700,lineHeight:1.15,letterSpacing:"-0.02em",marginBottom:28}}>面接で<span style={{fontStyle:"italic",color:"var(--ac)"}}>詰まる前</span>に、<br/>自分の弱点を知る。</h1>
      <p style={{fontSize:16,color:"var(--mu)",maxWidth:520,marginBottom:48,lineHeight:1.9}}>12問の診断であなたの面接の弱点を可視化。<br/>無料の模擬面接1問で、改善ポイントまでわかります。</p>
      <Btn onClick={go}>無料で診断する</Btn>
      <p style={{fontSize:12,color:"var(--lm)",marginTop:16}}>メールアドレス不要・約5分で完了</p>
    </div></section>
    <Dv/>
    <section style={{padding:"80px 32px",maxWidth:820,margin:"0 auto"}}><Lb>Pain Points</Lb>
      {["面接で何を話せばいいか分からない","自己PRが弱いと感じている","転職したいが踏み出せない","面接で頭が真っ白になったことがある"].map(function(t,i){return (<div key={i} style={{padding:"24px 0",borderBottom:"1px solid var(--ln)",display:"flex",gap:20,alignItems:"baseline"}}><span style={{fontFamily:"var(--fd)",fontSize:28,fontWeight:300,color:"var(--lm)",fontStyle:"italic",minWidth:36}}>{String(i+1).padStart(2,"0")}</span><span style={{fontSize:15,lineHeight:1.8}}>{t}</span></div>);})}
    </section>
    <div style={{background:"var(--ch)",color:"var(--cream)"}}><section style={{padding:"80px 32px",maxWidth:820,margin:"0 auto"}}><Lb>What You'll Get</Lb>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:48}}>
        {[{n:"01",t:"キャリアタイプ診断",d:"12問であなたの強み・傾向を可視化"},{n:"02",t:"面接の弱点分析",d:"タイプ別に詰まりやすいポイントを特定"},{n:"03",t:"無料模擬面接1問",d:"制限時間つきで実際に回答してみる"},{n:"04",t:"即座にフィードバック",d:"改善点と改善版回答を表示"}].map(function(i){return (<div key={i.n}><div style={{fontFamily:"var(--fd)",fontSize:36,fontWeight:300,fontStyle:"italic",color:"var(--ac)",marginBottom:12}}>{i.n}</div><div style={{fontSize:15,fontWeight:700,marginBottom:8}}>{i.t}</div><div style={{fontSize:13,color:"var(--lm)",lineHeight:1.7}}>{i.d}</div></div>);})}
      </div>
    </section></div>
    <section style={{padding:"80px 32px",textAlign:"center"}}><h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(28px,5vw,44px)",fontWeight:700,lineHeight:1.2,marginBottom:32}}>面接の不安を、<br/><span style={{fontStyle:"italic"}}>準備に変える。</span></h2><Btn onClick={go}>無料で診断する</Btn></section>
    <footer style={{padding:32,borderTop:"1px solid var(--ln)",display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--lm)"}}><div style={{display:"flex",gap:24}}><span>特定商取引法</span><span>プライバシーポリシー</span><span>利用規約</span></div><div>© 2025 CareerLab</div></footer>
  </div>);
}

// ─── Diagnostic ───
function DiagPage({onComplete}){
  const[cur,setCur]=useState(0);const[ans,setAns]=useState({});const[tr,setTr]=useState(false);const[dir,setDir]=useState(0);
  const q=QUESTIONS[cur];const prog=(Object.keys(ans).length/QUESTIONS.length)*100;
  useEffect(function(){SR.analytics.track("diagnostic_start");},[]);
  const pick=useCallback(function(v){if(tr)return;const nx=Object.assign({},ans);nx[q.id]=v;setAns(nx);SR.analytics.track("diagnostic_answer",{qid:q.id,v:v,n:cur+1});setDir(1);setTr(true);setTimeout(function(){if(cur<QUESTIONS.length-1)setCur(cur+1);else onComplete(nx);setDir(0);setTr(false);},350);},[cur,ans,q,onComplete,tr]);
  function back(){if(cur>0&&!tr){setDir(-1);setTr(true);setTimeout(function(){setCur(cur-1);setDir(0);setTr(false);},350);}}
  function choice(k){const sel=ans[q.id]===k;return (<button key={k} onClick={function(){pick(k);}} onMouseEnter={function(e){if(!sel)e.currentTarget.style.borderColor="var(--ch)";}} onMouseLeave={function(e){if(!sel)e.currentTarget.style.borderColor="var(--ln)";}} style={{display:"flex",alignItems:"baseline",gap:16,width:"100%",padding:"20px 24px",textAlign:"left",background:sel?"var(--ch)":"transparent",color:sel?"var(--cream)":"var(--ch)",border:"1px solid "+(sel?"var(--ch)":"var(--ln)"),cursor:tr?"default":"pointer",fontSize:14,lineHeight:1.7,fontFamily:"var(--fb)",transition:"all 0.25s ease"}}><span style={{fontFamily:"var(--fd)",fontSize:12,fontWeight:600,opacity:sel?1:0.4,minWidth:16,textTransform:"uppercase"}}>{k}</span><span>{q.choices[k]}</span></button>);}
  return (<div style={{...B,minHeight:"100vh",background:"var(--cream)",display:"flex",flexDirection:"column",...V}}><G/><Nav extra={<div style={{fontSize:13,fontFamily:"var(--fd)",fontWeight:600}}><span style={{color:"var(--ac)"}}>{String(cur+1).padStart(2,"0")}</span><span style={{color:"var(--lm)",margin:"0 4px"}}>/</span><span style={{color:"var(--lm)"}}>{String(QUESTIONS.length).padStart(2,"0")}</span></div>}/>
    <div style={{height:2,background:"var(--ln)"}}><div style={{height:"100%",width:prog+"%",background:"var(--ch)",transition:"width 0.5s cubic-bezier(0.22,1,0.36,1)"}}/></div>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"48px 32px",maxWidth:640,margin:"0 auto",width:"100%"}}><div style={{opacity:tr?0:1,transform:tr?"translateX("+(dir*-30)+"px)":"translateX(0)",transition:"all 0.35s cubic-bezier(0.22,1,0.36,1)"}}>
      <p style={{fontFamily:"var(--fd)",fontSize:14,fontStyle:"italic",color:"var(--ac)",marginBottom:20}}>Question {String(cur+1).padStart(2,"0")}</p>
      <h2 style={{fontSize:"clamp(18px,3.5vw,24px)",fontWeight:700,lineHeight:1.6,marginBottom:40}}>{q.text}</h2>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>{["a","b","c","d"].map(function(k){return choice(k);})}</div>
      {cur>0&&(<button onClick={back} style={{marginTop:32,background:"none",border:"none",cursor:"pointer",fontSize:13,color:"var(--lm)"}}>← 前の質問に戻る</button>)}
    </div></div>
  </div>);
}

// ─── Free Result + Stumbling Points ───
function ResultPage({typeResult,scores,onInterview,onRestart}){
  const[ph,setPh]=useState(0);const p=TYPES[typeResult.primaryType];const ac=p.accent;const mx=Math.max(...Object.values(scores));
  useEffect(function(){SR.analytics.track("diagnostic_complete",{type:typeResult.primaryType});SR.analytics.track("free_result_view");setTimeout(function(){setPh(1);},200);setTimeout(function(){setPh(2);},800);setTimeout(function(){setPh(3);},1400);},[]);
  return (<div style={{...B,minHeight:"100vh",background:"var(--cream)",...V}}><G/><Nav/>
    <section style={{padding:"80px 32px 60px",maxWidth:820,margin:"0 auto"}}><div style={{opacity:ph>=1?1:0,transform:ph>=1?"translateY(0)":"translateY(32px)",transition:"all 0.8s cubic-bezier(0.22,1,0.36,1)"}}>
      <Lb>Your Career Type</Lb>
      <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(42px,8vw,72px)",fontWeight:700,lineHeight:1.1,letterSpacing:"-0.03em",color:ac,marginBottom:8}}>{p.label}</h1>
      <p style={{fontFamily:"var(--fd)",fontSize:16,fontStyle:"italic",color:"var(--lm)"}}>{p.kana}</p>
      <p style={{fontSize:17,color:"var(--mu)",marginTop:16,lineHeight:1.8}}>{p.tagline}</p>
    </div></section><Dv/>

    {/* Scores */}
    <section style={{padding:"60px 32px",maxWidth:820,margin:"0 auto",opacity:ph>=2?1:0,transition:"all 0.7s ease 0.1s"}}><Lb>Score</Lb>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"24px 48px"}}>{Object.entries(scores).map(function(e){return (<div key={e[0]}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:13,fontWeight:500}}>{CL[e[0]]}</span><span style={{fontFamily:"var(--fd)",fontSize:16,fontWeight:600,color:ac}}>{e[1]}</span></div><div style={{height:3,background:"var(--ln)",position:"relative"}}><div style={{position:"absolute",height:"100%",background:ac,width:(ph>=2?(mx>0?(e[1]/mx)*100:0):0)+"%",transition:"width 1s cubic-bezier(0.22,1,0.36,1) 0.3s"}}/></div></div>);})}</div>
    </section><Dv/>

    {/* Strengths + Cautions (free) */}
    <div style={{opacity:ph>=3?1:0,transition:"all 0.7s ease"}}>
      <section style={{padding:"60px 32px",maxWidth:820,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}}>
        <div><Lb>Strengths</Lb>{p.strengths.map(function(s,i){return (<div key={i} style={{padding:"16px 0",borderBottom:"1px solid var(--ln)",display:"flex",gap:16,alignItems:"baseline"}}><span style={{fontFamily:"var(--fd)",fontSize:20,fontWeight:300,fontStyle:"italic",color:ac}}>{String(i+1).padStart(2,"0")}</span><span style={{fontSize:14,lineHeight:1.7}}>{s}</span></div>);})}</div>
        <div><Lb>Cautions</Lb>{p.cautions.map(function(c,i){return (<div key={i} style={{padding:"16px 0",borderBottom:"1px solid var(--ln)"}}><span style={{fontSize:14,color:"var(--mu)",lineHeight:1.7}}>{c}</span></div>);})}</div>
      </section>

      {/* 面接つまずきポイント（新規） */}
      <section style={{padding:"40px 32px 60px",maxWidth:820,margin:"0 auto",borderTop:"1px solid var(--ln)"}}>
        <Lb>Interview Stumbling Points</Lb>
        <p style={{fontSize:14,color:"var(--mu)",marginBottom:24}}>あなたのタイプが面接で詰まりやすいポイントです。</p>
        {p.stumble.map(function(s,i){return (<div key={i} style={{padding:20,marginBottom:12,background:"var(--warm)"}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:8,color:ac}}>{s.pt}</div>
          <div style={{fontSize:13,color:"var(--mu)",lineHeight:1.7,marginBottom:6}}>{s.why}</div>
          <div style={{fontSize:13,color:"var(--ch)",fontStyle:"italic"}}>例: {s.ex}</div>
        </div>);})}
      </section>

      {/* 模擬面接CTA */}
      <section style={{background:"var(--ch)",color:"var(--cream)",padding:"64px 32px"}}><div style={{maxWidth:820,margin:"0 auto",textAlign:"center"}}>
        <Lb>Free Mock Interview</Lb>
        <h3 style={{fontFamily:"var(--fd)",fontSize:"clamp(24px,4vw,36px)",fontWeight:700,marginBottom:16,lineHeight:1.3}}>1問だけ、試してみませんか？</h3>
        <p style={{fontSize:14,color:"var(--lm)",lineHeight:1.9,maxWidth:480,margin:"0 auto 32px"}}>「あなたの強みを教えてください」に60秒で答えてみましょう。<br/>回答後、すぐにフィードバックと改善例がもらえます。</p>
        <Btn onClick={function(){SR.analytics.track("mock_interview_start");onInterview();}} style={{background:"var(--cream)",color:"var(--ch)"}}>無料模擬面接を試す</Btn>
      </div></section>
      <div style={{padding:"48px 32px",textAlign:"center"}}><Btn ghost onClick={onRestart}>もう一度診断する</Btn></div>
    </div>
  </div>);
}

// ─── Mock Interview (Timer + Text Input) ───
function InterviewPage({typeResult,onSubmit}){
  const[time,setTime]=useState(60);const[text,setText]=useState("");const[done,setDone]=useState(false);const ref=useRef(null);
  const p=TYPES[typeResult.primaryType];const ac=p.accent;

  useEffect(function(){
    SR.analytics.track("page_view",{path:"/interview"});
    SR.voice.speak("あなたの強みを教えてください。");
    const iv=setInterval(function(){setTime(function(t){if(t<=1){clearInterval(iv);setDone(true);return 0;}return t-1;});},1000);
    return function(){clearInterval(iv);};
  },[]);

  function handleSubmit(){
    if(text.trim().length<5)return;
    SR.analytics.track("mock_interview_submit",{len:text.length,timeLeft:time});
    onSubmit(text);
  }

  const pct=(time/60)*100;const urgent=time<=10;

  return (<div style={{...B,minHeight:"100vh",background:"var(--cream)",display:"flex",flexDirection:"column",...V}}><G/><Nav/>
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"48px 32px",maxWidth:640,margin:"0 auto",width:"100%"}}>
      {/* Timer */}
      <div style={{width:100,height:100,borderRadius:50,border:"3px solid "+(urgent?"var(--ac)":"var(--ln)"),display:"flex",alignItems:"center",justifyContent:"center",marginBottom:32,position:"relative",transition:"border-color 0.3s"}}>
        <svg width="100" height="100" style={{position:"absolute",top:0,left:0,transform:"rotate(-90deg)"}}><circle cx="50" cy="50" r="46" fill="none" stroke={urgent?"var(--ac)":"var(--ch)"} strokeWidth="3" strokeDasharray={289} strokeDashoffset={289*(1-pct/100)} style={{transition:"stroke-dashoffset 1s linear"}}/></svg>
        <span style={{fontFamily:"var(--fd)",fontSize:32,fontWeight:700,color:urgent?"var(--ac)":"var(--ch)"}}>{time}</span>
      </div>

      {/* Question */}
      <p style={{fontFamily:"var(--fd)",fontSize:14,fontStyle:"italic",color:"var(--lm)",marginBottom:12}}>Mock Interview</p>
      <h2 style={{fontSize:"clamp(20px,4vw,28px)",fontWeight:700,textAlign:"center",lineHeight:1.5,marginBottom:8}}>あなたの強みを教えてください。</h2>

      {/* Voice mock icon */}
      <button onClick={function(){SR.voice.speak("あなたの強みを教えてください。");}} style={{fontSize:12,color:"var(--lm)",background:"none",border:"1px solid var(--ln)",padding:"6px 14px",cursor:"pointer",marginBottom:32,display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:16}}>🔊</span> 質問を読み上げる
      </button>

      {/* Hints */}
      <div style={{width:"100%",padding:16,background:"var(--warm)",marginBottom:24}}>
        <div style={{fontSize:12,color:"var(--lm)",marginBottom:8}}>Hints:</div>
        {["結論から述べましょう","具体的なエピソードを1つ入れましょう","仕事でどう活かせるかに繋げましょう"].map(function(h,i){return (<div key={i} style={{fontSize:13,color:"var(--mu)",padding:"2px 0"}}>・{h}</div>);})}
      </div>

      {/* Text input */}
      <textarea ref={ref} value={text} onChange={function(e){setText(e.target.value);}} placeholder="ここに回答を入力してください..." disabled={done&&text.length===0} style={{width:"100%",minHeight:160,padding:20,fontSize:15,lineHeight:1.8,border:"1px solid var(--ln)",background:"#fff",fontFamily:"var(--fb)",resize:"vertical",outline:"none"}} />
      <div style={{display:"flex",justifyContent:"space-between",width:"100%",marginTop:8}}>
        <span style={{fontSize:12,color:"var(--lm)"}}>{text.length} 文字</span>
        <span style={{fontSize:12,color:urgent?"var(--ac)":"var(--lm)"}}>残り {time}秒</span>
      </div>

      <div style={{marginTop:32,display:"flex",gap:16}}>
        <Btn onClick={handleSubmit} style={{opacity:text.trim().length<5?0.5:1}}>回答を送信する</Btn>
      </div>
    </div>
  </div>);
}

// ─── Feedback ───
function FeedbackPage({feedback,typeResult,onOffer,onRetry,onRestart}){
  const p=TYPES[typeResult.primaryType];const ac=p.accent;
  useEffect(function(){SR.analytics.track("mock_interview_feedback_view",{score:feedback.score});},[]);

  const scoreColor=feedback.score>=75?"#2d6a4f":feedback.score>=50?"#8b6914":"#c4573a";

  return (<div style={{...B,minHeight:"100vh",background:"var(--cream)",...V}}><G/><Nav/>
    <div style={{maxWidth:820,margin:"0 auto",padding:"0 32px"}}>

      {/* Score card */}
      <section style={{padding:"60px 0 40px",textAlign:"center",borderBottom:"1px solid var(--ln)"}}>
        <Lb>Feedback</Lb>
        <div style={{width:120,height:120,borderRadius:60,border:"4px solid "+scoreColor,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
          <span style={{fontFamily:"var(--fd)",fontSize:48,fontWeight:700,color:scoreColor}}>{feedback.score}</span>
        </div>
        <p style={{fontSize:16,color:"var(--mu)",lineHeight:1.8,maxWidth:480,margin:"0 auto"}}>{feedback.comment}</p>
      </section>

      {/* Criterion breakdown */}
      <section style={{padding:"40px 0",borderBottom:"1px solid var(--ln)"}}>
        <Lb>Evaluation</Lb>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
          {feedback.checks.map(function(c,i){
            var col=c.score>=70?"#2d6a4f":c.score>=50?"#8b6914":"#c4573a";
            return (<div key={i} style={{padding:16,background:"var(--warm)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:13,fontWeight:600}}>{c.label}</span><span style={{fontFamily:"var(--fd)",fontSize:18,fontWeight:700,color:col}}>{c.score}</span></div>
              <div style={{height:3,background:"var(--ln)"}}><div style={{height:"100%",background:col,width:c.score+"%"}}/></div>
            </div>);
          })}
        </div>
      </section>

      {/* Good / Bad */}
      <section style={{padding:"40px 0",borderBottom:"1px solid var(--ln)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}}>
        <div><Lb>Good Points</Lb>{feedback.good.map(function(g,i){return (<div key={i} style={{padding:"12px 0",borderBottom:"1px solid var(--ln)",fontSize:14,lineHeight:1.7}}>{g}</div>);})}</div>
        <div><Lb>Improvement</Lb>{feedback.bad.map(function(b,i){return (<div key={i} style={{padding:"12px 0",borderBottom:"1px solid var(--ln)",fontSize:14,color:"var(--mu)",lineHeight:1.7}}>{b}</div>);})}</div>
      </section>

      {/* Improved answer */}
      <section style={{padding:"40px 0",borderBottom:"1px solid var(--ln)"}}>
        <Lb>Improved Answer Example</Lb>
        <div style={{padding:24,background:"var(--warm)",fontSize:15,lineHeight:2.0,whiteSpace:"pre-line"}}>{feedback.improved}</div>
      </section>

      {/* CTAs */}
      <section style={{background:"var(--ch)",color:"var(--cream)",padding:"64px 32px",margin:"0 -32px"}}><div style={{maxWidth:820,margin:"0 auto",textAlign:"center"}}>
        <Lb>Next Step</Lb>
        <h3 style={{fontFamily:"var(--fd)",fontSize:"clamp(24px,4vw,36px)",fontWeight:700,marginBottom:16,lineHeight:1.3}}>面接で詰まらないために、<br/>もっと練習しませんか？</h3>
        <p style={{fontSize:14,color:"var(--lm)",lineHeight:1.9,marginBottom:32}}>あなた専用の面接練習で、弱点を克服できます。</p>
        <Btn onClick={function(){SR.analytics.track("paid_cta_click");onOffer();}} style={{background:"var(--cream)",color:"var(--ch)"}}>有料プランを見る</Btn>
      </div></section>

      <div style={{padding:"48px 0",display:"flex",justifyContent:"center",gap:16}}>
        <Btn ghost onClick={onRetry}>もう一度回答する</Btn>
        <Btn ghost onClick={onRestart}>最初からやり直す</Btn>
      </div>
    </div>
  </div>);
}

// ─── Offer ───
function OfferPage({onRestart}){
  useEffect(function(){SR.analytics.track("page_view",{path:"/offer"});},[]);
  return (<div style={{...B,minHeight:"100vh",background:"var(--cream)",...V}}><G/><Nav/>
    <div style={{maxWidth:820,margin:"0 auto",padding:"60px 32px"}}>
      <Lb>Plans</Lb>
      <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(28px,5vw,44px)",fontWeight:700,lineHeight:1.2,marginBottom:48}}>面接の不安を、<br/><span style={{fontStyle:"italic"}}>実力に変える。</span></h2>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:24}}>
        {PRODUCTS.map(function(pr,i){
          var featured=i===0;
          return (<div key={pr.slug} style={{padding:32,border:featured?"2px solid var(--ac)":"1px solid var(--ln)",position:"relative"}}>
            {featured&&(<div style={{position:"absolute",top:-12,left:24,background:"var(--ac)",color:"#fff",padding:"4px 12px",fontSize:11,fontWeight:700,letterSpacing:"0.05em"}}>RECOMMENDED</div>)}
            <div style={{fontSize:16,fontWeight:700,marginBottom:8}}>{pr.name}</div>
            <div style={{fontSize:13,color:"var(--mu)",marginBottom:16}}>{pr.tagline}</div>
            <div style={{fontFamily:"var(--fd)",fontSize:36,fontWeight:700,color:featured?"var(--ac)":"var(--ch)",marginBottom:20}}>¥{pr.price.toLocaleString()}</div>
            {pr.features.map(function(f,j){return (<div key={j} style={{fontSize:13,color:"var(--mu)",padding:"4px 0",display:"flex",gap:8}}><span style={{color:featured?"var(--ac)":"var(--lm)"}}>—</span><span>{f}</span></div>);})}
            <button onClick={function(){SR.analytics.track("checkout_start",{product:pr.slug});}} style={{marginTop:24,width:"100%",padding:"14px",fontSize:14,fontWeight:700,background:featured?"var(--ch)":"transparent",color:featured?"#fff":"var(--ch)",border:featured?"none":"1px solid var(--ln)",cursor:"pointer"}}>{pr.cta}</button>
            <p style={{fontSize:11,color:"var(--lm)",textAlign:"center",marginTop:8}}>※ デモのため決済は動作しません</p>
          </div>);
        })}
      </div>
    </div>
    <div style={{padding:"48px 32px",textAlign:"center"}}><Btn ghost onClick={onRestart}>トップに戻る</Btn></div>
  </div>);
}

/* ================================================================
   SECTION 7 : APP ROOT
   ================================================================ */
export default function App(){
  var init=load()||{page:"lp",answers:{},scores:null,typeResult:null,feedback:null};
  var[page,setPage]=useState(init.page);
  var[answers,setAnswers]=useState(init.answers);
  var[scores,setScores]=useState(init.scores);
  var[typeResult,setTypeResult]=useState(init.typeResult);
  var[feedback,setFeedback]=useState(init.feedback);

  useEffect(function(){save({page:page,answers:answers,scores:scores,typeResult:typeResult,feedback:feedback});},[page,answers,scores,typeResult,feedback]);

  var onDiagComplete=useCallback(function(ans){
    var sc=calcScores(ans);var tr=detType(sc);
    setAnswers(ans);setScores(sc);setTypeResult(tr);setPage("result");
  },[]);

  var onInterviewSubmit=useCallback(function(text){
    var fb=evalAnswer(text,typeResult.primaryType);
    setFeedback(fb);setPage("feedback");
  },[typeResult]);

  function restart(){clear();setPage("lp");setAnswers({});setScores(null);setTypeResult(null);setFeedback(null);}

  if(page==="lp"){return (<LPPage onStart={function(){setPage("diagnostic");}}/>);}
  if(page==="diagnostic"){return (<DiagPage onComplete={onDiagComplete}/>);}
  if(page==="result"&&typeResult&&scores){return (<ResultPage typeResult={typeResult} scores={scores} onInterview={function(){setPage("interview");}} onRestart={restart}/>);}
  if(page==="interview"&&typeResult){return (<InterviewPage typeResult={typeResult} onSubmit={onInterviewSubmit}/>);}
  if(page==="feedback"&&feedback&&typeResult){return (<FeedbackPage feedback={feedback} typeResult={typeResult} onOffer={function(){setPage("offer");}} onRetry={function(){setPage("interview");}} onRestart={restart}/>);}
  if(page==="offer"){return (<OfferPage onRestart={restart}/>);}
  return (<LPPage onStart={function(){setPage("diagnostic");}}/>);
}
