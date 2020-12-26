#include <iostream>
#include <vector>
#include <utility>
#include <functional>
#include <queue>

using namespace std;

vector<pair<int,pair<int,int> > > g[10005];
int n,e,used[10005],mstAns;
priority_queue<pair<int,pair<int,int> >, vector<pair<int,pair<int,int> > >, greater<pair<int,pair<int,int> > > > pq;

void process(int u)                     // funkcija za obradu cvora
{
    used[u]=1;                          // kazemo da je 'obradjen' tj. dodat u trenutni mcst
    for(int i=0;i<g[u].size();i++)      // idemo po susedima
    {
        int v=g[u][i].second.second;
        if(!used[v])                    // za neobradjenog suseda dodajemo granu u pq
            pq.push(g[u][i]);
    }
}

void Prim() // slozenost algoritma je  O(E Log V) gde je E broj grana a V broj cvorova grafa
{
    
    process(1);                         // krecemo od cvora 1
    while(!pq.empty())                  // dok god red sa prioritetom nije prazan
    {
        int v=pq.top().second.second, u=pq.top().second.first, w=pq.top().first;  // uzimamo sledeci element - granu
        pq.pop();
        if(!used[v])                    // ako nije obradjen, potrebno ga je obraditi
        {
            cout<<u<<"-"<<v<<" "<<w<<"\n"; // ispisemo granu
            mstAns+=w;                  // dodajemo tezinu na ukupnu tezinu mcst
            process(v);                 // i zatim ga obradjujemo
        }
    }
}

// ucitavanje i ispis stabla za ucitan graf
int main()
{
    ios_base::sync_with_stdio(0);
    cin>>n>>e;
    for(int i=0;i<e;i++)
    {
        int u,v,w;
        cin>>u>>v>>w;
        g[u].push_back(make_pair(w,make_pair(u,v)));
        g[v].push_back(make_pair(w,make_pair(v,u)));
    }
    cout << "Primov algoritam: " << endl;
    Prim();
    cout<<mstAns;
    return 0;
}
